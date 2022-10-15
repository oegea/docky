import { StartLoginRequestValueObject } from './StartLoginRequestValueObject'
import { ValidateLoginRequestValueObject } from './ValidateLoginRequestValueObject'
import { emailValidatorRepository } from '../../infrastructure/repositories/factory'

const startLoginRequestValueObject = async ({
  email
}: {
  email: string
}): Promise<StartLoginRequestValueObject> => {
  const startLoginRequestValueObject = new StartLoginRequestValueObject({
    email,
    emailValidatorRepository: emailValidatorRepository()
  })

  await startLoginRequestValueObject.validate()

  return startLoginRequestValueObject
}

const validateLoginRequestValueObject = async ( {
  email,
  code
}: {
  email: string
  code: number
}): Promise<ValidateLoginRequestValueObject> => {
  const validateLoginRequestValueObject = new ValidateLoginRequestValueObject({
    code,
    email,
    emailValidatorRepository: emailValidatorRepository()
  })

  await validateLoginRequestValueObject.validate()

  return validateLoginRequestValueObject
}

export { startLoginRequestValueObject, validateLoginRequestValueObject }
