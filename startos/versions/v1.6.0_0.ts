import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_6_0_0 = VersionInfo.of({
  version: '1.6.0:0',
  releaseNotes: {
    en_US: 'Update to MailFlow 1.6.0.',
    es_ES: 'Actualización a MailFlow 1.6.0.',
    de_DE: 'Update auf MailFlow 1.6.0.',
    pl_PL: 'Aktualizacja do MailFlow 1.6.0.',
    fr_FR: 'Mise à jour vers MailFlow 1.6.0.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
