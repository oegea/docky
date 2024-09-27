import { EmailValueObject } from './EmailValueObject'

class ValidateLoginRequestValueObject {
  private readonly code: number
  private readonly emailValueObject: EmailValueObject
  private readonly sessionDetails: any

  constructor ({
    code,
    emailValueObject,
    sessionDetails
  }: {
    code: number
    emailValueObject: EmailValueObject,
    sessionDetails?: any
  }) {
    this.code = code
    this.emailValueObject = emailValueObject
    this.sessionDetails = sessionDetails
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

  getSessionDetails (): any {
    return this.sessionDetails
  }
}

export { ValidateLoginRequestValueObject }
