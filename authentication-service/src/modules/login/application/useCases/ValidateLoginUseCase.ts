import { ValidateLoginRequestValueObject } from '../../domain/valueObjects/ValidateLoginRequestValueObject'
import { ValidateLoginService } from '../../domain/services/ValidateLoginService'

class ValidateLoginUseCase {
  private readonly validateLoginRequestValueObject: (
    { email, code, sessionDetails, skipCodeValidation }: {email: string, code: number, sessionDetails?: any, skipCodeValidation?: boolean}
  ) => Promise<ValidateLoginRequestValueObject>

  private readonly validateLoginService: ValidateLoginService

  constructor ({
    validateLoginRequestValueObject,
    validateLoginService
  }: {
    validateLoginRequestValueObject: ({ email, code, sessionDetails, skipCodeValidation }: {email: string, code: number, sessionDetails?: any, skipCodeValidation?: boolean}) => Promise<ValidateLoginRequestValueObject>
    validateLoginService: ValidateLoginService
  }) {
    this.validateLoginRequestValueObject = validateLoginRequestValueObject
    this.validateLoginService = validateLoginService
  }

  public async execute ({ email, code, sessionDetails, skipCodeValidation }: {email: string, code: number, sessionDetails?: any, skipCodeValidation?: boolean}): Promise<string> {
    try {
      const validateLoginRequestValueObject = await this.validateLoginRequestValueObject({ email, code, sessionDetails, skipCodeValidation })
      return await this.validateLoginService.execute({ validateLoginRequestValueObject })
    } catch (e) {
      throw e.message
    }
  }
}

export { ValidateLoginUseCase }
