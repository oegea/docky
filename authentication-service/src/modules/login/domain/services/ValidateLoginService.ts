import { ValidateLoginRequestValueObject } from '../valueObjects/ValidateLoginRequestValueObject'
//import { TokenGeneratorRepository } from '../repositories/TokenGeneratorRepository'
import { LoginRepository } from '../repositories/LoginRepository'
import { EmailSenderRepository } from '../repositories/EmailSenderRepository'

class ValidateLoginService {
  private readonly loginRepository: LoginRepository
  //private readonly tokenGeneratorRepository: TokenGeneratorRepository

  constructor ({
    loginRepository,
    //tokenGeneratorRepository
  }: {
    loginRepository: LoginRepository
    //tokenGeneratorRepository: TokenGeneratorRepository
  }) {
    this.loginRepository = loginRepository
    //this.tokenGeneratorRepository = tokenGeneratorRepository
  }

  public async execute ({
    validateLoginRequestValueObject
  }: {
    validateLoginRequestValueObject: ValidateLoginRequestValueObject
  }): Promise<string> {


    return 'asdasdasdasd123'


  }
}

export { ValidateLoginService }
