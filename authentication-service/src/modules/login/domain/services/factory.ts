// Domain
import { 
  emailSenderRepository,
  loginRepository, 
  randomNumberGeneratorRepository
} from '../../infrastructure/repositories/factory'
// Service
import { StartLoginService } from './StartLoginService'

const startLoginService = (): StartLoginService => new StartLoginService({
  emailSenderRepository: emailSenderRepository(),
  loginRepository: loginRepository(),
  randomNumberGeneratorRepository: randomNumberGeneratorRepository()
})

export { startLoginService }
