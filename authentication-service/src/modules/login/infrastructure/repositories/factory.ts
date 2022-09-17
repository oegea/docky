// Domain
import { EmailValidatorRepository } from '../../domain/repositories/EmailValidatoryRepository'
import { RandomNumberGeneratorRepository } from '../../domain/repositories/RandomNumberGeneratorRepository'
import { LoginRepository } from '../../domain/repositories/LoginRepository'
// Infrastructure repositories
import { DeepEmailValidatorRepository } from './DeepEmailValidatorRepository'
import { NativeRandomNumberGeneratorRepository } from './NativeRandomNumberGeneratorRepository'
import { MongoDBLoginRepository } from './MongoDbLoginRepository'

const emailValidatorRepository = (): EmailValidatorRepository => new DeepEmailValidatorRepository()
const randomNumberGeneratorRepository = (): RandomNumberGeneratorRepository => new NativeRandomNumberGeneratorRepository()
const loginRepository = (): LoginRepository => new MongoDBLoginRepository()

export { emailValidatorRepository, randomNumberGeneratorRepository, loginRepository }
