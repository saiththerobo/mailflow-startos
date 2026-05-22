import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_2_0_0 = VersionInfo.of({
  version: '1.2.0:0',
  releaseNotes: {
    en_US: 'Update to MailFlow 1.2.0: font size and family picker in composer, local and self-signed SSO providers via allow_insecure flag.',
    es_ES: 'Actualización a MailFlow 1.2.0: selector de tamaño y familia de fuente en el compositor, proveedores SSO locales y con certificados autofirmados mediante allow_insecure.',
    de_DE: 'Update auf MailFlow 1.2.0: Schriftgröße und -familie im Kompositor wählbar, lokale und selbstsignierte SSO-Anbieter über allow_insecure.',
    pl_PL: 'Aktualizacja do MailFlow 1.2.0: wybór rozmiaru i rodziny czcionki w oknie kompozytora, obsługa lokalnych dostawców SSO z własnoręcznie podpisanymi certyfikatami przez allow_insecure.',
    fr_FR: 'Mise à jour vers MailFlow 1.2.0 : sélecteur de taille et famille de police dans le compositeur, fournisseurs SSO locaux et auto-signés via allow_insecure.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
