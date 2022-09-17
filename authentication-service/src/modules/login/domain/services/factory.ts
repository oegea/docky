// Domain
import { randomNumberGeneratorRepository, loginRepository } from '../../infrastructure/repositories/factory'
// Service
import { StartLoginService } from './StartLoginService'

const startLoginService = (): StartLoginService => new StartLoginService({
  randomNumberGeneratorRepository: randomNumberGeneratorRepository(),
  loginRepository: loginRepository()
})

export { startLoginService }
