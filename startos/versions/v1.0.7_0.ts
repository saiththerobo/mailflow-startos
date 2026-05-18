import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_7_0 = VersionInfo.of({
  version: '1.0.7:0',
  releaseNotes: {
    en_US: 'Update to MailFlow 1.0.7: swipe actions, message list quick actions, account reorder, German language, threaded action fixes, and various bug fixes.',
    es_ES: 'Actualización a MailFlow 1.0.7: acciones de deslizamiento, acciones rápidas en lista de mensajes, reordenación de cuentas, idioma alemán, correcciones de acciones en hilos y otras correcciones.',
    de_DE: 'Update auf MailFlow 1.0.7: Wischgesten, Schnellaktionen in der Nachrichtenliste, Konto-Neuanordnung, Deutsch-Unterstützung, Korrekturen bei Thread-Aktionen und weitere Fehlerbehebungen.',
    pl_PL: 'Aktualizacja do MailFlow 1.0.7: gesty przesuwania, szybkie akcje na liście wiadomości, zmiana kolejności kont, język niemiecki, poprawki akcji wątkowych i inne poprawki.',
    fr_FR: 'Mise à jour vers MailFlow 1.0.7 : actions de balayage, actions rapides dans la liste des messages, réorganisation des comptes, langue allemande, corrections des actions sur les fils de discussion et diverses corrections.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
