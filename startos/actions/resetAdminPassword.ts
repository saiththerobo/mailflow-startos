import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  password: Value.text({
    name: i18n('New Password'),
    description: i18n('The new password for the MailFlow admin account'),
    required: true,
    default: null,
    masked: true,
    generate: { charset: 'a-z,A-Z,0-9', len: 22 },
    inputmode: 'text',
    patterns: [],
    placeholder: null,
  }),
})

export const resetAdminPassword = sdk.Action.withInput(
  'reset-admin-password',

  async ({ effects }) => ({
    name: i18n('Reset Admin Password'),
    description: i18n(
      'Change the password for the first registered (admin) MailFlow account',
    ),
    warning: null,
    allowedStatuses: 'only-running' as const,
    group: null,
    visibility: 'enabled' as const,
  }),

  inputSpec,

  async ({ effects }) => ({ password: undefined }),

  async ({ effects, input }) => {
    const store = await storeJson.read().const(effects)
    if (!store) throw new Error('store.json not found — reinstall the package')

    // Single container: bcrypt hash + pg UPDATE in one Node.js script.
    // Uses the backend image's own node_modules so we get the exact same
    // bcrypt cost factor (12) and DB connection path as the backend itself.
    // WHERE is_admin = true (no MIN(uuid) ordering — updates all admin users).
    const script = `
      const bcrypt = require('/app/node_modules/bcryptjs');
      const { Client } = require('/app/node_modules/pg');
      async function run() {
        const hash = await bcrypt.hash(process.env.P, 12);
        const client = new Client({ host: '127.0.0.1', port: 5432, user: 'mailflow', password: process.env.DB_PASS, database: 'mailflow' });
        await client.connect();
        const res = await client.query('UPDATE users SET password_hash = $1 WHERE is_admin = true', [hash]);
        await client.end();
        if (res.rowCount === 0) throw new Error('No admin user found in the database');
      }
      run().catch(e => { process.stderr.write(e.message); process.exit(1); });
    `

    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'mailflow-backend' },
      null,
      'reset-pw-backend',
      async (backendSub) => {
        await backendSub.execFail(
          ['node', '-e', script],
          { env: { P: input.password, DB_PASS: store.dbPassword } },
        )
      },
    )

    return {
      version: '1' as const,
      title: i18n('Password Reset'),
      message: i18n(
        'The admin password has been updated. You can now log in with the new password.',
      ),
      result: {
        type: 'single' as const,
        name: i18n('New Password'),
        description: null,
        value: input.password,
        masked: true,
        copyable: true,
        qr: false,
      },
    }
  },
)
