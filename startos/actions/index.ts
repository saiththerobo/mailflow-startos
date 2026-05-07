import { sdk } from '../sdk'
import { resetAdminPassword } from './resetAdminPassword'

export const actions = sdk.Actions.of().addAction(resetAdminPassword)
