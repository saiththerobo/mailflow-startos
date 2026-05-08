import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_3_0 = VersionInfo.of({
  version: '1.0.3:0',
  releaseNotes: {
    en_US: 'Update to upstream MailFlow v1.0.3.',
    es_ES: 'Actualización a MailFlow v1.0.3 upstream.',
    de_DE: 'Update auf MailFlow v1.0.3 upstream.',
    pl_PL: 'Aktualizacja do upstream MailFlow v1.0.3.',
    fr_FR: 'Mise à jour vers MailFlow v1.0.3 upstream.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
