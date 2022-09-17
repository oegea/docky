import { EmailValidatorRepository } from '../../domain/repositories/EmailValidatoryRepository'

class StartLoginRequestValueObject {
  private readonly email: string
  private readonly emailValidatorRepository: EmailValidatorRepository

  constructor ({
    email,
    emailValidatorRepository
  }: {
    email: string
    emailValidatorRepository: EmailValidatorRepository
  }) {
    this.email = email
    this.emailValidatorRepository = emailValidatorRepository
  }

  async validate (): Promise<void> {
    this.emailIsString()
    this.emailLengthIsValid()
    await this.emailFormatIsValid()
  }

  emailIsString (): void {
    if (typeof this.email !== 'string') { throw new Error(`StartLoginRequestValueObject: Invalid type provided for email property. Expected string, got ${typeof this.email}`) }
  }

  emailLengthIsValid (): void {
    if (this.email.length < 1) { throw new Error('StartLoginRequestValueObject: email property could not be shorter than 1 character.') }

    if (this.email.length > 255) { throw new Error('StartLoginRequestValueObject: email property could not be larger than 255 characters.') }
  }

  async emailFormatIsValid (): Promise<void> {
    const validationResult = await this.emailValidatorRepository.hasValidFormat(this.email)
    if (!validationResult) { throw new Error('StartLoginRequestValueObject: email format is not valid') }
  }
}

export { StartLoginRequestValueObject }
