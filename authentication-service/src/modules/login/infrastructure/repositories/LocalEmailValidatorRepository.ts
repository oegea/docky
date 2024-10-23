// Domain
import { EmailValidatorRepository } from '../../domain/repositories/EmailValidatoryRepository'

class LocalEmailValidatorRepository implements EmailValidatorRepository {
  async hasValidFormat (email: string): Promise<boolean> {
    try {
      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regexEmail.test(email)
    } catch (e) {
      console.error(e)
      return false
    }
  }
}

export { LocalEmailValidatorRepository }
