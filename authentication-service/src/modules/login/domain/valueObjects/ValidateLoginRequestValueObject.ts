import { EmailValueObject } from './EmailValueObject'

class ValidateLoginRequestValueObject {
  private readonly code: number
  private readonly emailValueObject: EmailValueObject
  private readonly sessionDetails: any
  private readonly skipCodeValidation: boolean

  constructor ({
    code,
    emailValueObject,
    sessionDetails,
    skipCodeValidation = false
  }: {
    code: number
    emailValueObject: EmailValueObject
    sessionDetails?: any
    skipCodeValidation?: boolean
  }) {
    this.code = code
    this.emailValueObject = emailValueObject
    this.sessionDetails = sessionDetails
    this.skipCodeValidation = skipCodeValidation
  }

  async validate (): Promise<void> {
    await this.emailValueObject.validate()
  }

  getCode (): number {
    return this.code
  }

  getEmail (): string {
    return this.emailValueObject.getEmail()
  }

  shouldSkipCodeValidation (): boolean {
    return this.skipCodeValidation
  }

  getSessionDetails (): any {
    return this.sessionDetails
  }
}

export { ValidateLoginRequestValueObject }
