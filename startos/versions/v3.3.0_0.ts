import { VersionInfo } from '@start9labs/start-sdk'

export const v_3_3_0_0 = VersionInfo.of({
  version: '3.3.0:0',
  releaseNotes: {
    en_US: 'Update to MailFlow 3.3.0.',
    es_ES: 'Actualización a MailFlow 3.3.0.',
    de_DE: 'Update auf MailFlow 3.3.0.',
    pl_PL: 'Aktualizacja do MailFlow 3.3.0.',
    fr_FR: 'Mise à jour vers MailFlow 3.3.0.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
