import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_2_2 = VersionInfo.of({
  version: '1.0.2:2',
  releaseNotes: {
    en_US: 'Fix package license to AGPL-3.0 (matching upstream MailFlow).',
    es_ES: 'Corrección de la licencia del paquete a AGPL-3.0 (igual que MailFlow).',
    de_DE: 'Paketlizenz auf AGPL-3.0 korrigiert (wie MailFlow upstream).',
    pl_PL: 'Poprawka licencji pakietu na AGPL-3.0 (zgodnie z upstream MailFlow).',
    fr_FR: "Correction de la licence du paquet en AGPL-3.0 (conforme à l'upstream MailFlow).",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
