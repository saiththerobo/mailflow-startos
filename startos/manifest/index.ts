import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'mailflow',
  title: 'MailFlow',
  license: 'AGPL-3.0',
  packageRepo: 'https://github.com/saiththerobo/mailflow-startos',
  upstreamRepo: 'https://github.com/maathimself/mailflow',
  marketingUrl: 'https://mailflow.sh/',
  donationUrl: null,
  docsUrls: ['https://github.com/maathimself/mailflow/blob/main/README.md'],
  description: { short, long },
  volumes: ['main'],
  images: {
    'mailflow-frontend': {
      source: { dockerBuild: { workdir: '../services/mailflow/frontend' } },
      arch: ['x86_64', 'aarch64'],
    },
    'mailflow-backend': {
      source: { dockerBuild: { workdir: '../services/mailflow/backend' } },
      arch: ['x86_64', 'aarch64'],
    },
    postgres: {
      source: { dockerTag: 'postgres:16-alpine' },
      arch: ['x86_64', 'aarch64'],
    },
    redis: {
      source: { dockerTag: 'redis:7-alpine' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
