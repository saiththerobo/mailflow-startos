import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_2_1 = VersionInfo.of({
  version: '1.0.2:1',
  releaseNotes: {
    en_US: 'Fix: inbox now loads correctly when "Group conversations" is enabled (patched upstream bug — missing column in threaded query).',
    es_ES: 'Corrección: la bandeja de entrada ahora carga correctamente con "Agrupar conversaciones" activado.',
    de_DE: 'Bugfix: Posteingang lädt jetzt korrekt wenn "Konversationen gruppieren" aktiviert ist.',
    pl_PL: 'Poprawka: skrzynka odbiorcza ładuje się poprawnie gdy włączone jest "Grupowanie rozmów".',
    fr_FR: 'Correctif : la boîte de réception se charge correctement avec "Grouper les conversations" activé.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
