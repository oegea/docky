// Domain
import { EmailValidatorRepository } from '../../domain/repositories/EmailValidatoryRepository'
import { RandomNumberGeneratorRepository } from '../../domain/repositories/RandomNumberGeneratorRepository'
// Infrastructure repositories
import { DeepEmailValidatorRepository } from './DeepEmailValidatorRepository'
import { NativeRandomNumberGeneratorRepository } from './NativeRandomNumberGeneratorRepository'

const emailValidatorRepository = (): EmailValidatorRepository => new DeepEmailValidatorRepository()
const randomNumberGeneratorRepository = (): RandomNumberGeneratorRepository => new NativeRandomNumberGeneratorRepository()

export { emailValidatorRepository, randomNumberGeneratorRepository }
