// Domain
import { startLoginRequestValueObject } from '../../domain/valueObjects/factory'
// Use cases
import { StartLoginUseCase } from './StartLoginUseCase'

const startLoginUseCase = (): StartLoginUseCase => new StartLoginUseCase({
    startLoginRequestValueObject
})

export { startLoginUseCase }
