import { ValidateLoginRequestValueObject } from '../valueObjects/ValidateLoginRequestValueObject'
import { TokenGeneratorRepository } from '../repositories/TokenGeneratorRepository'
import { LoginRepository } from '../repositories/LoginRepository'

const WAIT_TIME = 3000

class ValidateLoginService {
  private readonly loginRepository: LoginRepository
  private readonly tokenGeneratorRepository: TokenGeneratorRepository

  constructor ({
    loginRepository,
    tokenGeneratorRepository
  }: {
    loginRepository: LoginRepository
    tokenGeneratorRepository: TokenGeneratorRepository
  }) {
    this.loginRepository = loginRepository
    this.tokenGeneratorRepository = tokenGeneratorRepository
  }

  public async execute ({
    validateLoginRequestValueObject
  }: {
    validateLoginRequestValueObject: ValidateLoginRequestValueObject
  }): Promise<string> {
    // For security purposes, we'll wait sometime before returning the token
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME))

    // Should not continue if provided code and email is not valid
    const codeIsValid = await this.loginRepository.verifyCode(validateLoginRequestValueObject)

    // Remove the code from the database even if it is not valid
    await this.loginRepository.removeCode(validateLoginRequestValueObject)

    if (!codeIsValid) { throw new Error('ValidateLoginService: received code is not valid') }

    const token = this.tokenGeneratorRepository.generateToken(validateLoginRequestValueObject)
    return await token
  }
}

export { ValidateLoginService }
