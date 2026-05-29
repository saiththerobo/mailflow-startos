import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_3_0_0 = VersionInfo.of({
  version: '1.3.0:0',
  releaseNotes: {
    en_US: 'Update to MailFlow 1.3.0: Microsoft personal account (Outlook/Hotmail) OAuth support, font size slider, recent folders in move picker, bulk mark read/unread, auto-advance after delete, and inbox rule sync fix.',
    es_ES: 'Actualización a MailFlow 1.3.0: soporte OAuth para cuentas personales de Microsoft (Outlook/Hotmail), control deslizante de tamaño de fuente, carpetas recientes en el selector de mover, marcar como leído/no leído en masa, avance automático tras eliminar y corrección de sincronización de reglas.',
    de_DE: 'Update auf MailFlow 1.3.0: OAuth-Unterstützung für Microsoft-Privatkonten (Outlook/Hotmail), Schriftgrößenregler, zuletzt verwendete Ordner im Verschieben-Dialog, Massenmarkierung gelesen/ungelesen, automatisches Weiterschalten nach Löschen und Behebung der Regelsynchonisierung.',
    pl_PL: 'Aktualizacja do MailFlow 1.3.0: obsługa OAuth dla kont osobistych Microsoft (Outlook/Hotmail), suwak rozmiaru czcionki, ostatnie foldery w oknie przenoszenia, masowe oznaczanie jako przeczytane/nieprzeczytane, automatyczne przejście po usunięciu i poprawka synchronizacji reguł.',
    fr_FR: 'Mise à jour vers MailFlow 1.3.0 : support OAuth pour les comptes personnels Microsoft (Outlook/Hotmail), curseur de taille de police, dossiers récents dans le sélecteur de déplacement, marquer en masse comme lu/non lu, avance automatique après suppression et correction de la synchronisation des règles.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
