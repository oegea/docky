// Domain
import { LoginRepository } from '../../domain/repositories/LoginRepository'
import { StartLoginRequestValueObject } from '../../domain/valueObjects/StartLoginRequestValueObject'

class MongoDBLoginRepository implements LoginRepository {
  async save (startLoginRequestValueObject: StartLoginRequestValueObject): Promise<boolean> {
    return true
  }
}

export { MongoDBLoginRepository }
