import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_4_0 = VersionInfo.of({
  version: '1.0.4:0',
  releaseNotes: {
    en_US: 'Update to upstream MailFlow v1.0.4: adds About tab showing version and build SHA.',
    es_ES: 'Actualización a MailFlow v1.0.4: añade pestaña Acerca de con versión y SHA de compilación.',
    de_DE: 'Update auf MailFlow v1.0.4: fügt Über-Tab mit Version und Build-SHA hinzu.',
    pl_PL: 'Aktualizacja do MailFlow v1.0.4: dodaje zakładkę O aplikacji z wersją i SHA kompilacji.',
    fr_FR: 'Mise à jour vers MailFlow v1.0.4 : ajoute un onglet À propos affichant la version et le SHA de build.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
