import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_2_4 = VersionInfo.of({
  version: '1.0.2:4',
  releaseNotes: {
    en_US: 'Mobile swipe gestures: swipe left to archive, swipe right to mark read/unread.',
    es_ES: 'Gestos de deslizamiento móvil: deslizar a la izquierda para archivar, a la derecha para marcar como leído/no leído.',
    de_DE: 'Mobile Wischgesten: nach links wischen zum Archivieren, nach rechts wischen zum Lesen/Ungelesen markieren.',
    pl_PL: 'Gesty przesuwania na urządzeniach mobilnych: przesuń w lewo, aby zarchiwizować, w prawo, aby oznaczyć jako przeczytane/nieprzeczytane.',
    fr_FR: 'Gestes de balayage mobile : balayez à gauche pour archiver, à droite pour marquer lu/non lu.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
