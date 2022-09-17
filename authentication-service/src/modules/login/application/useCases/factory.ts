// Domain
import { startLoginRequestValueObject } from '../../domain/valueObjects/factory'
import { startLoginService } from '../../domain/services/factory'
// Use cases
import { StartLoginUseCase } from './StartLoginUseCase'

const startLoginUseCase = (): StartLoginUseCase => new StartLoginUseCase({
  startLoginRequestValueObject,
  startLoginService: startLoginService()
})

export { startLoginUseCase }
