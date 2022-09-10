import { StartLoginRequestValueObject } from './StartLoginRequestValueObject'
import { emailValidatorRepository } from '../../infrastructure/repositories/factory'

const startLoginRequestValueObject = async ({
    email
}: {
    email: string
}): Promise<StartLoginRequestValueObject> => {
    const startLoginRequestValueObject =  new StartLoginRequestValueObject({
        email, 
        emailValidatorRepository: emailValidatorRepository()
    })

    await startLoginRequestValueObject.validate()

    return startLoginRequestValueObject
}

export { startLoginRequestValueObject }
