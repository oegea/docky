import { EmailValidatorRepository } from '../../domain/repositories/EmailValidatoryRepository'

const CONFIG_SPLIT_MARK: string = ', '

class StartLoginRequestValueObject {
  private readonly email: string
  private readonly emailValidatorRepository: EmailValidatorRepository
  private randomNumber: number

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

    if (
      this.emailValidationIsEnabled() === true && 
      this.emailIsSpecificallyAllowed() === false
    ) {
      this.emailHasAllowedDomain()
    }
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

  emailValidationIsEnabled(): boolean {
    return (process.env.PASS_AUTH_LIMIT_ACCESS_BY_EMAIL === 'true')
  }

  emailIsSpecificallyAllowed(): boolean {
    const allowedEmails = process.env.PASS_AUTH_ALLOWED_EMAILS.split(CONFIG_SPLIT_MARK)
    const foundEmails = allowedEmails.find((allowedEmail) => allowedEmail === this.email)
    return (foundEmails !== undefined)
  }

  emailHasAllowedDomain(): void {
    const allowedDomains = process.env.PASS_AUTH_ALLOWED_DOMAINS.split(CONFIG_SPLIT_MARK)
    const currentDomain = this.getDomainFromEmail()

    const foundDomains = allowedDomains.find((domain) => domain === currentDomain)

    if (foundDomains === undefined){
      throw new Error('StartLoginRequestValueObject: email is not authorized to login')
    }
  }

  setRandomNumber (randomNumber: number): void {
    this.randomNumber = randomNumber
  }

  getRandomNumber (): number {
    return this.randomNumber
  }

  getEmail (): string {
    return this.email
  }

  getDomainFromEmail(): string {
    return this.email.split('@')[1] || ''
  }
}

export { StartLoginRequestValueObject }
