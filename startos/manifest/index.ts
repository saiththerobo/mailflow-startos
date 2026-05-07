import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'mailflow',
  title: 'MailFlow',
  license: 'MIT',
  packageRepo: 'https://github.com/saiththerobo/mailflow-startos',
  upstreamRepo: 'https://github.com/maathimself/mailflow',
  marketingUrl: 'https://mailflow.sh/',
  donationUrl: null,
  docsUrls: ['https://github.com/maathimself/mailflow/blob/main/README.md'],
  description: { short, long },
  volumes: ['main'],
  images: {
    'mailflow-frontend': {
      source: { dockerTag: 'ghcr.io/maathimself/mailflow-frontend:1.0.2' },
      arch: ['x86_64', 'aarch64'],
    },
    'mailflow-backend': {
      source: { dockerTag: 'ghcr.io/maathimself/mailflow-backend:1.0.2' },
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
