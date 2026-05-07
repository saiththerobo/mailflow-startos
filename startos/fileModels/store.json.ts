import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  sessionSecret: z.string().catch(''),
  dbPassword: z.string().catch(''),
  encryptionKey: z.string().catch(''),
  appUrl: z.string().catch(''),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: './store.json' },
  shape,
)
