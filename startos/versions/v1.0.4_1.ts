import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_4_1 = VersionInfo.of({
  version: '1.0.4:1',
  releaseNotes: {
    en_US: 'About tab now shows correct version and build SHA.',
    es_ES: 'La pestaña Acerca de ahora muestra la versión y SHA de compilación correctos.',
    de_DE: 'Der Über-Tab zeigt jetzt die korrekte Version und Build-SHA an.',
    pl_PL: 'Zakładka O aplikacji wyświetla teraz poprawną wersję i SHA kompilacji.',
    fr_FR: "L'onglet À propos affiche maintenant la version et le SHA de build corrects.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
