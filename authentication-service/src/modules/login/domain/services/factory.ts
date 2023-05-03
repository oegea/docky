// Domain
import {
  emailSenderRepository,
  loginRepository,
  randomNumberGeneratorRepository,
  tokenGeneratorRepository
} from '../../infrastructure/repositories/factory'
// Service
import { StartLoginService } from './StartLoginService'
import { ValidateLoginService } from './ValidateLoginService'

const startLoginService = (): StartLoginService => new StartLoginService({
  emailSenderRepository: emailSenderRepository(),
  loginRepository: loginRepository(),
  randomNumberGeneratorRepository: randomNumberGeneratorRepository()
})

const validateLoginService = (): ValidateLoginService => new ValidateLoginService({
  loginRepository: loginRepository(),
  tokenGeneratorRepository: tokenGeneratorRepository()
})

export { startLoginService, validateLoginService }
