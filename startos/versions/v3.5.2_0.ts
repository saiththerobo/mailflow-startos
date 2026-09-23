import { VersionInfo } from '@start9labs/start-sdk'

export const v_3_5_2_0 = VersionInfo.of({
  version: '3.5.2:0',
  releaseNotes: {
    en_US:
      'Updates MailFlow to 3.5.2: IMAP push notifications now work, a draft-handling data loss bug is fixed, accented subject lines decode correctly, and Gmail can be connected over OAuth. Rebuilt on the StartOS 2.0 SDK.',
    es_ES:
      'Actualiza MailFlow a 3.5.2: las notificaciones push de IMAP ya funcionan, se corrige una pérdida de datos al guardar borradores, los asuntos con acentos se descodifican correctamente y Gmail puede conectarse mediante OAuth. Reconstruido con el SDK 2.0 de StartOS.',
    de_DE:
      'Aktualisiert MailFlow auf 3.5.2: IMAP-Push-Benachrichtigungen funktionieren jetzt, ein Datenverlust beim Speichern von Entwürfen wurde behoben, Betreffzeilen mit Akzenten werden korrekt dekodiert und Gmail kann über OAuth verbunden werden. Neu gebaut mit dem StartOS-2.0-SDK.',
    pl_PL:
      'Aktualizuje MailFlow do 3.5.2: powiadomienia push IMAP wreszcie działają, naprawiono utratę danych przy zapisywaniu wersji roboczych, tematy ze znakami diakrytycznymi są poprawnie dekodowane, a Gmail można podłączyć przez OAuth. Przebudowano na SDK StartOS 2.0.',
    fr_FR:
      "Met à jour MailFlow vers 3.5.2 : les notifications push IMAP fonctionnent enfin, une perte de données lors de l'enregistrement des brouillons est corrigée, les objets accentués sont décodés correctement et Gmail peut être connecté via OAuth. Reconstruit sur le SDK StartOS 2.0.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
