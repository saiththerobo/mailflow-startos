export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting MailFlow': 0,
  'Waiting for PostgreSQL': 1,
  'PostgreSQL is ready': 2,
  'Waiting for Redis': 3,
  'Redis is ready': 4,
  'The API is ready': 5,
  'The API is not ready': 6,
  'Web Interface': 7,
  'The web interface is ready': 8,
  'The web interface is not ready': 9,

  // interfaces.ts
  'Web UI': 10,
  'The MailFlow webmail interface': 11,

  // actions/resetAdminPassword.ts
  'Reset Admin Password': 12,
  'Change the password for the first registered (admin) MailFlow account': 13,
  'New Password': 14,
  'The new password for the MailFlow admin account': 15,
  'Password Reset': 16,
  'The admin password has been updated. You can now log in with the new password.': 17,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
