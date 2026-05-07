import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_2_0 = VersionInfo.of({
  version: '1.0.2:0',
  releaseNotes: {
    en_US: 'Initial StartOS packaging of MailFlow 1.0.2.',
    es_ES: 'Empaquetado inicial de MailFlow 1.0.2 para StartOS.',
    de_DE: 'Erstmalige StartOS-Paketierung von MailFlow 1.0.2.',
    pl_PL: 'Pierwsze pakowanie MailFlow 1.0.2 dla StartOS.',
    fr_FR: 'Premier empaquetage de MailFlow 1.0.2 pour StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
