// Domain
import { LoginRepository } from '../../domain/repositories/LoginRepository'
import { StartLoginRequestValueObject } from '../../domain/valueObjects/StartLoginRequestValueObject'
import { ValidateLoginRequestValueObject } from '../../domain/valueObjects/ValidateLoginRequestValueObject'
// Infrastructure
import { MongoDBConnection } from '@useful-tools/docky-shared-kernel'
class MongoDBLoginRepository implements LoginRepository {
  getMongoDbAuthCollection (): any {
    const mongoDbClient = MongoDBConnection.getConnection()

    const database = mongoDbClient.db(process.env.COMMON_MONGODB_DATABASE)
    const collection = database.collection(process.env.AUTH_COLLECTION)

    return collection
  }

  async save (startLoginRequestValueObject: StartLoginRequestValueObject): Promise<boolean> {
    const collection = this.getMongoDbAuthCollection()
    try {
      await collection.deleteMany({
        email: startLoginRequestValueObject.getEmail()
      })

      await collection.insertOne({
        email: startLoginRequestValueObject.getEmail(),
        number: startLoginRequestValueObject.getRandomNumber(),
        createdAt: new Date(Date.now())
      })
    } catch (e) {
      console.error(e)
      return false
    }

    return true
  }

  async verifyCode (validateLoginRequestValueObject: ValidateLoginRequestValueObject): Promise<boolean> {
    const email = validateLoginRequestValueObject.getEmail()
    const number = validateLoginRequestValueObject.getCode()
    const collection = this.getMongoDbAuthCollection()

    const result = await collection.findOne({
      email,
      number
    })

    if (!result) {
      return false
    }

    await collection.deleteMany({
      email
    })

    return true
  }
}

export { MongoDBLoginRepository }
