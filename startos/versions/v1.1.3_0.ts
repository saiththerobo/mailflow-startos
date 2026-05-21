import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_1_3_0 = VersionInfo.of({
  version: '1.1.3:0',
  releaseNotes: {
    en_US: 'Update to MailFlow 1.1.3: faster favicon badge updates, unread count reliability fixes, context menu reply/forward with quoted body, and bulk IMAP batch improvements.',
    es_ES: 'Actualización a MailFlow 1.1.3: actualizaciones más rápidas del favicon, correcciones de fiabilidad del contador de no leídos, respuesta/reenvío en menú contextual con cuerpo citado y mejoras en lotes IMAP masivos.',
    de_DE: 'Update auf MailFlow 1.1.3: schnellere Favicon-Abzeichen-Updates, Zuverlässigkeitskorrekturen bei ungelesenen Nachrichten, Kontext-Menü Antwort/Weiterleitung mit zitiertem Text und verbesserte IMAP-Batch-Verarbeitung.',
    pl_PL: 'Aktualizacja do MailFlow 1.1.3: szybsze aktualizacje znacznika favicon, poprawki niezawodności licznika nieprzeczytanych, odpowiedź/przekazanie w menu kontekstowym z cytowaną treścią i ulepszenia wsadowego IMAP.',
    fr_FR: 'Mise à jour vers MailFlow 1.1.3 : mises à jour du favicon plus rapides, corrections de fiabilité du compteur non lu, réponse/transfert via le menu contextuel avec corps cité et améliorations des lots IMAP en masse.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
