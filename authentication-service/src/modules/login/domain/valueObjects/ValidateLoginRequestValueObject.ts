import { EmailValueObject } from './EmailValueObject'

class ValidateLoginRequestValueObject {
  private readonly code: number
  private readonly emailValueObject: EmailValueObject

  constructor ({
    code,
    emailValueObject
  }: {
    code: number
    emailValueObject: EmailValueObject
  }) {
    this.code = code
    this.emailValueObject = emailValueObject
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
}

export { ValidateLoginRequestValueObject }
