import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_3_1 = VersionInfo.of({
  version: '1.0.3:1',
  releaseNotes: {
    en_US: 'Add file attachment support.',
    es_ES: 'Añadir soporte para archivos adjuntos.',
    de_DE: 'Dateianhang-Unterstützung hinzugefügt.',
    pl_PL: 'Dodano obsługę załączników.',
    fr_FR: 'Ajout du support des pièces jointes.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
