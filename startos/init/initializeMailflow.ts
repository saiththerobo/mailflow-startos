import { randomBytes } from 'node:crypto'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'

export const initializeMailflow = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await storeJson.merge(effects, {
      sessionSecret: randomBytes(32).toString('hex'),
      dbPassword: randomBytes(16).toString('hex'),
      encryptionKey: randomBytes(32).toString('hex'),
    })
  }

  // Detect the service's LAN URL and store it so the backend can use it as
  // APP_URL for WebSocket origin validation and OIDC redirect URIs.
  // Runs on every init so the URL stays current if network settings change.
  // SDK 2.0: interfaces live on their host's bindings, reached via sdk.host.getOwn.
  const urls =
    (await sdk.host
      .getOwn(effects, 'ui-multi', (host) => {
        const ui = Object.values(host?.bindings ?? {})
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === 'ui')
        return ui?.addressInfo.nonLocal.format() ?? []
      })
      .const()) ?? []

  const appUrl = urls.find((u: string) => u.includes('.local')) ?? urls[0] ?? ''
  if (appUrl) {
    await storeJson.merge(effects, { appUrl })
  }
})
