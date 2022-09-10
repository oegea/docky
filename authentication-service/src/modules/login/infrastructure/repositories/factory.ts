import { EmailValidatorRepository } from '../../domain/repositories/EmailValidatoryRepository'
import { DeepEmailValidatorRepository } from './DeepEmailValidatorRepository'

const emailValidatorRepository = (): EmailValidatorRepository => new DeepEmailValidatorRepository()

export { emailValidatorRepository }
