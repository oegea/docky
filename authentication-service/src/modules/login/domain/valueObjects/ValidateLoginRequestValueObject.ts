import { EmailValidatorRepository } from '../../domain/repositories/EmailValidatoryRepository'

class ValidateLoginRequestValueObject {
  private readonly code: string
  private readonly email: string
  private readonly emailValidatorRepository: EmailValidatorRepository

  constructor ({
    code,
    email,
    emailValidatorRepository
  }: {
    code: string
    email: string
    emailValidatorRepository: EmailValidatorRepository
  }) {
    this.code = code
    this.email = email
    this.emailValidatorRepository = emailValidatorRepository
  }

  async validate (): Promise<void> {
    this.emailIsString()
    this.emailLengthIsValid()
    await this.emailFormatIsValid()
  }

  emailIsString (): void {
    if (typeof this.email !== 'string') { throw new Error(`ValidateLoginRequestValueObject: Invalid type provided for email property. Expected string, got ${typeof this.email}`) }
  }

  emailLengthIsValid (): void {
    if (this.email.length < 1) { throw new Error('ValidateLoginRequestValueObject: email property could not be shorter than 1 character.') }

    if (this.email.length > 255) { throw new Error('ValidateLoginRequestValueObject: email property could not be larger than 255 characters.') }
  }

  async emailFormatIsValid (): Promise<void> {
    const validationResult = await this.emailValidatorRepository.hasValidFormat(this.email)
    if (!validationResult) { throw new Error('ValidateLoginRequestValueObject: email format is not valid') }
  }

  getCode (): string {
    return this.code
  }

  getEmail (): string {
    return this.email
  }
}

export { ValidateLoginRequestValueObject }
