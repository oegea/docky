// Domain
import { startLoginRequestValueObject, validateLoginRequestValueObject } from '../../domain/valueObjects/factory'
import { startLoginService, validateLoginService } from '../../domain/services/factory'
// Use cases
import { StartLoginUseCase } from './StartLoginUseCase'
import { ValidateLoginUseCase } from './ValidateLoginUseCase'

const startLoginUseCase = (): StartLoginUseCase => new StartLoginUseCase({
  startLoginRequestValueObject,
  startLoginService: startLoginService()
})

const validateLoginUseCase = (): ValidateLoginUseCase => new ValidateLoginUseCase({
  validateLoginRequestValueObject,
  validateLoginService: validateLoginService()
})

export { startLoginUseCase, validateLoginUseCase }
