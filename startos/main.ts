import { writeFile } from 'node:fs/promises'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort, backendPort, nginxConf } from './utils'
import { storeJson } from './fileModels/store.json'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting MailFlow'))

  const store = await storeJson.read().const(effects)
  if (!store) throw new Error('store.json not found — reinstall the package')

  const { sessionSecret, dbPassword, encryptionKey, appUrl } = store

  const postgresSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'postgres' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: 'postgres',
      mountpoint: '/var/lib/postgresql',
      readonly: false,
    }),
    'postgres-sub',
  )

  const redisSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'redis' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: 'redis',
      mountpoint: '/data',
      readonly: false,
    }),
    'redis-sub',
  )

  const backendSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'mailflow-backend' },
    sdk.Mounts.of(),
    'backend-sub',
  )

  const frontendSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'mailflow-frontend' },
    sdk.Mounts.of(),
    'frontend-sub',
  )

  // Override the nginx config baked into the image: drop the HTTPS server block
  // (StartOS terminates TLS) and replace "backend" hostname with 127.0.0.1
  // (all subcontainers in a StartOS service share the same network namespace).
  await writeFile(
    `${frontendSub.rootfs}/etc/nginx/conf.d/default.conf`,
    nginxConf,
  )

  return sdk.Daemons.of(effects)
    .addDaemon('postgres', {
      subcontainer: postgresSub,
      exec: {
        command: sdk.useEntrypoint(['-c', 'listen_addresses=127.0.0.1']),
        env: {
          POSTGRES_USER: 'mailflow',
          POSTGRES_PASSWORD: dbPassword,
          POSTGRES_DB: 'mailflow',
        },
      },
      ready: {
        display: null,
        fn: async () => {
          const result = await postgresSub.exec([
            'pg_isready',
            '-q',
            '-h',
            '127.0.0.1',
            '-d',
            'mailflow',
            '-U',
            'mailflow',
          ])
          if (result.exitCode !== 0) {
            return { result: 'loading', message: i18n('Waiting for PostgreSQL') }
          }
          return { result: 'success', message: i18n('PostgreSQL is ready') }
        },
      },
      requires: [],
    })
    .addDaemon('redis', {
      subcontainer: redisSub,
      exec: {
        command: sdk.useEntrypoint([
          '--save',
          '60',
          '1',
          '--loglevel',
          'warning',
          '--bind',
          '127.0.0.1',
        ]),
      },
      ready: {
        display: null,
        fn: async () => {
          const result = await redisSub.exec([
            'redis-cli',
            '-h',
            '127.0.0.1',
            'ping',
          ])
          if (result.exitCode !== 0 || !result.stdout.toString().trim().startsWith('PONG')) {
            return { result: 'loading', message: i18n('Waiting for Redis') }
          }
          return { result: 'success', message: i18n('Redis is ready') }
        },
      },
      requires: [],
    })
    .addDaemon('backend', {
      subcontainer: backendSub,
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          NODE_ENV: 'production',
          PORT: String(backendPort),
          SESSION_SECRET: sessionSecret,
          APP_URL: appUrl,
          FRONTEND_URL: appUrl,
          DB_HOST: '127.0.0.1',
          DB_NAME: 'mailflow',
          DB_USER: 'mailflow',
          DB_PASSWORD: dbPassword,
          REDIS_URL: 'redis://127.0.0.1:6379',
          ENCRYPTION_KEY: encryptionKey,
        },
      },
      ready: {
        display: null,
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, backendPort, {
            successMessage: i18n('The API is ready'),
            errorMessage: i18n('The API is not ready'),
          }),
      },
      requires: ['postgres', 'redis'],
    })
    .addDaemon('frontend', {
      subcontainer: frontendSub,
      exec: {
        command: sdk.useEntrypoint(),
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: ['backend'],
    })
})
