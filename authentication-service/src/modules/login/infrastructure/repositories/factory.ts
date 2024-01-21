// Domain
import { EmailSenderRepository } from '../../domain/repositories/EmailSenderRepository'
import { EmailValidatorRepository } from '../../domain/repositories/EmailValidatoryRepository'
import { LoginRepository } from '../../domain/repositories/LoginRepository'
import { RandomNumberGeneratorRepository } from '../../domain/repositories/RandomNumberGeneratorRepository'
import { TokenGeneratorRepository } from '../../domain/repositories/TokenGeneratorRepository'
// Infrastructure repositories
import { LocalEmailValidatorRepository } from './LocalEmailValidatorRepository'
import { MongoDBLoginRepository } from './MongoDBLoginRepository'
import { NativeRandomNumberGeneratorRepository } from './NativeRandomNumberGeneratorRepository'
import { NodeMailerEmailSenderRepository } from './NodeMailerEmailSenderRepository'
import { JwtTokenGeneratorRepository } from './JwtTokenGeneratorRepository'

const emailSenderRepository = (): EmailSenderRepository => new NodeMailerEmailSenderRepository()
const emailValidatorRepository = (): EmailValidatorRepository => new LocalEmailValidatorRepository()
const loginRepository = (): LoginRepository => new MongoDBLoginRepository()
const randomNumberGeneratorRepository = (): RandomNumberGeneratorRepository => new NativeRandomNumberGeneratorRepository()
const tokenGeneratorRepository = (): TokenGeneratorRepository => new JwtTokenGeneratorRepository()

export {
  emailSenderRepository,
  emailValidatorRepository,
  loginRepository,
  randomNumberGeneratorRepository,
  tokenGeneratorRepository
}
