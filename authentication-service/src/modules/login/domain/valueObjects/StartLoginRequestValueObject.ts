import { EmailValueObject } from './EmailValueObject'

const CONFIG_SPLIT_MARK: string = ', '

class StartLoginRequestValueObject {
  private readonly emailValueObject: EmailValueObject
  private randomNumber: number

  constructor ({
    emailValueObject,
  }: {
    emailValueObject: EmailValueObject
  }) {
    this.emailValueObject = emailValueObject
  }

  async validate (): Promise<void> {

    await this.emailValueObject.validate()

    if (
      this.emailValidationIsEnabled() === true && 
      this.emailIsSpecificallyAllowed() === false
    ) {
      this.emailHasAllowedDomain()
    }
  }

  emailValidationIsEnabled(): boolean {
    return (process.env.PASS_AUTH_LIMIT_ACCESS_BY_EMAIL === 'true')
  }

  emailIsSpecificallyAllowed(): boolean {
    const allowedEmails = process.env.PASS_AUTH_ALLOWED_EMAILS.split(CONFIG_SPLIT_MARK)
    const foundEmails = allowedEmails.find((allowedEmail) => allowedEmail === this.getEmail())
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
    return this.emailValueObject.getEmail()
  }

  getDomainFromEmail(): string {
    return this.getEmail().split('@')[1] || ''
  }
}

export { StartLoginRequestValueObject }
