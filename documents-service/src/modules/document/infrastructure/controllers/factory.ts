import { SharedController } from 'passager-backend-shared-kernel'
import { StartLoginController } from './StartLoginController'
import { ValidateLoginController } from './ValidateLoginController'

const startLoginController = (req, res): SharedController => new StartLoginController(req, res)
const validateLoginController = (req, res): SharedController => new ValidateLoginController(req, res)

export { startLoginController, validateLoginController }
