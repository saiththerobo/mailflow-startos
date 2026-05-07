import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_0_2_3 = VersionInfo.of({
  version: '1.0.2:3',
  releaseNotes: {
    en_US: 'Add "Reset Admin Password" action.',
    es_ES: 'Añadir acción "Restablecer contraseña de administrador".',
    de_DE: 'Aktion „Admin-Passwort zurücksetzen" hinzugefügt.',
    pl_PL: 'Dodanie akcji „Resetuj hasło administratora".',
    fr_FR: 'Ajout de l\'action « Réinitialiser le mot de passe administrateur ».',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
