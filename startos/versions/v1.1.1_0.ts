import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_1_1_0 = VersionInfo.of({
  version: '1.1.1:0',
  releaseNotes: {
    en_US: 'Update to MailFlow 1.1.1: bulk delete/move/archive, image whitelist search, levelled logging, swipe hook refactor, and migration crash fix.',
    es_ES: 'Actualización a MailFlow 1.1.1: eliminación/movimiento/archivo masivo, búsqueda de lista blanca de imágenes, registro por niveles, refactorización de gesto de deslizamiento y corrección de error de migración.',
    de_DE: 'Update auf MailFlow 1.1.1: Massen-Löschen/Verschieben/Archivieren, Suche in der Bild-Whitelist, gestuftes Logging, Wischgesten-Refaktorierung und Behebung eines Migrations-Absturzfehlers.',
    pl_PL: 'Aktualizacja do MailFlow 1.1.1: masowe usuwanie/przenoszenie/archiwizowanie, wyszukiwanie na białej liście obrazów, rejestrowanie poziomowe, refaktoryzacja gestu przesuwania i naprawa awarii migracji.',
    fr_FR: 'Mise à jour vers MailFlow 1.1.1 : suppression/déplacement/archivage en masse, recherche dans la liste blanche des images, journalisation par niveaux, refactorisation du geste de balayage et correction d\'un crash de migration.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
