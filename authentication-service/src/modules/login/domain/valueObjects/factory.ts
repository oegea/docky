import { StartLoginRequestValueObject } from './StartLoginRequestValueObject'
import { ValidateLoginRequestValueObject } from './ValidateLoginRequestValueObject'
import { EmailValueObject } from './EmailValueObject'
import { emailValidatorRepository } from '../../infrastructure/repositories/factory'

const emailValueObject = async ({
  email
}: {
  email: string
}): Promise<EmailValueObject> => {
  const emailValueObject = new EmailValueObject({
    email,
    emailValidatorRepository: emailValidatorRepository()
  })

  await emailValueObject.validate()

  return emailValueObject
}

const startLoginRequestValueObject = async ({
  email,
  ipAddress
}: {
  email: string,
  ipAddress: string
}): Promise<StartLoginRequestValueObject> => {
  const emailValueObjectInstance = await emailValueObject({ email })

  const startLoginRequestValueObject = new StartLoginRequestValueObject({
    emailValueObject: emailValueObjectInstance,
    ipAddress
  })

  await startLoginRequestValueObject.validate()

  return startLoginRequestValueObject
}

const validateLoginRequestValueObject = async ({
  email,
  code,
  sessionDetails
}: {
  email: string
  code: number,
  sessionDetails?: any
}): Promise<ValidateLoginRequestValueObject> => {
  const emailValueObjectInstance = await emailValueObject({ email })
  const validateLoginRequestValueObject = new ValidateLoginRequestValueObject({
    code,
    emailValueObject: emailValueObjectInstance,
    sessionDetails
  })

  await validateLoginRequestValueObject.validate()

  return validateLoginRequestValueObject
}

export { startLoginRequestValueObject, validateLoginRequestValueObject }
