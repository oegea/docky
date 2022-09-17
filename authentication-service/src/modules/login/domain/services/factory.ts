// Domain
import { randomNumberGeneratorRepository } from '../../infrastructure/repositories/factory'
// Service
import { StartLoginService } from './StartLoginService'

const startLoginService = (): StartLoginService => new StartLoginService({
  randomNumberGeneratorRepository: randomNumberGeneratorRepository()
})

export { startLoginService }
