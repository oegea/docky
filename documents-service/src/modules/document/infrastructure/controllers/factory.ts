import { BasicController } from '../../../basic/infrastructure/controllers/BasicController'
import { StartLoginController } from './StartLoginController'
import { ValidateLoginController } from './ValidateLoginController'

const startLoginController = (req, res): BasicController => new StartLoginController(req, res)
const validateLoginController = (req, res): BasicController => new ValidateLoginController(req, res)

export { startLoginController, validateLoginController }
