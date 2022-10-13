// Domain
import { EmailSenderRepository } from '../../domain/repositories/EmailSenderRepository'
import { EmailValidatorRepository } from '../../domain/repositories/EmailValidatoryRepository'
import { LoginRepository } from '../../domain/repositories/LoginRepository'
import { RandomNumberGeneratorRepository } from '../../domain/repositories/RandomNumberGeneratorRepository'
// Infrastructure repositories
import { DeepEmailValidatorRepository } from './DeepEmailValidatorRepository'
import { MongoDBLoginRepository } from './MongoDbLoginRepository'
import { NativeRandomNumberGeneratorRepository } from './NativeRandomNumberGeneratorRepository'
import { NodeMailerEmailSenderRepository } from './NodeMailerEmailSenderRepository'

const emailSenderRepository = (): EmailSenderRepository => new NodeMailerEmailSenderRepository()
const emailValidatorRepository = (): EmailValidatorRepository => new DeepEmailValidatorRepository()
const loginRepository = (): LoginRepository => new MongoDBLoginRepository()
const randomNumberGeneratorRepository = (): RandomNumberGeneratorRepository => new NativeRandomNumberGeneratorRepository()

export { 
    emailSenderRepository, 
    emailValidatorRepository, 
    loginRepository, 
    randomNumberGeneratorRepository, 
}
