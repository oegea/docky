// Third party dependencies
import validate from 'deep-email-validator'
// Domain
import { EmailValidatorRepository } from '../../domain/repositories/EmailValidatoryRepository'

class DeepEmailValidatorRepository implements EmailValidatorRepository {
    async hasValidFormat(email: string): Promise<boolean> {
        try{
            const validateResult = await validate({
                email,
                validateTypo: false,
                validateSMTP: false
            });
            if (!validateResult)
                return false;
        
            return validateResult.valid;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

export {DeepEmailValidatorRepository}