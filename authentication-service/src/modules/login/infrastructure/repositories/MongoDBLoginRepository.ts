// Domain
import { LoginRepository } from '../../domain/repositories/LoginRepository'
import { StartLoginRequestValueObject } from '../../domain/valueObjects/StartLoginRequestValueObject'
import { ValidateLoginRequestValueObject } from '../../domain/valueObjects/ValidateLoginRequestValueObject'
// Infrastructure
import { MongoDBConnection } from '@useful-tools/docky-shared-kernel'

const IP_LIMIT_COLLECTION_NAME = 'ipLimit'
class MongoDBLoginRepository implements LoginRepository {
  getMongoDbAuthCollection (): any {
    const mongoDbClient = MongoDBConnection.getConnection()

    const database = mongoDbClient.db(process.env.COMMON_MONGODB_DATABASE)
    const collection = database.collection(process.env.AUTH_COLLECTION)

    return collection
  }

  getMongoDbIpLimitCollection (): any {
    const mongoDbClient = MongoDBConnection.getConnection()

    const database = mongoDbClient.db(process.env.COMMON_MONGODB_DATABASE)
    const collection = database.collection(IP_LIMIT_COLLECTION_NAME)

    return collection
  }

  async save (startLoginRequestValueObject: StartLoginRequestValueObject): Promise<boolean> {
    const collection = this.getMongoDbAuthCollection()
    try {
      const attempsByIp = Number(process.env.AUTH_LIMIT_ATTEMPTS_PER_IP)
      if (attempsByIp !== undefined && Number(attempsByIp) > 0) {
        const ipLimitCollection = this.getMongoDbIpLimitCollection()
        const ipAddress = startLoginRequestValueObject.getIpAddress()
        // Get ip attempts from ipLimitCollection
        const result = await ipLimitCollection.findOne({
          ipAddress
        })

        // each document from ipLimitCollection has expirationTime, attempts and ipAddress
        let attempts = 1
        if (result && result.expirationTime > Date.now()) {
          attempts = result.attempts + 1
        }
        if (result) {
          // Remove
          await ipLimitCollection.deleteMany({
            ipAddress
          })
        }

        await ipLimitCollection.insertOne({
          ipAddress,
          attempts,
          expirationTime: Date.now() + Number(process.env.AUTH_LIMIT_ATTEMPTS_PER_IP_WAIT_TIME)
        })
      }

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

    return true
  }

  async removeCode (validateLoginRequestValueObject: ValidateLoginRequestValueObject): Promise<boolean> {
    const email = validateLoginRequestValueObject.getEmail()
    const collection = this.getMongoDbAuthCollection()

    await collection.deleteMany({
      email
    })

    return true
  }

  async hasIpReachedLimit (ipAddress: string, attempsByIp: number) {
    const ipLimitCollection = this.getMongoDbIpLimitCollection()
    // Get ip attempts from ipLimitCollection
    const result = await ipLimitCollection.findOne({
      ipAddress
    })

    // each document from ipLimitCollection has expirationTime, attempts and ipAddress
    // if there is no document, then there are no attempts
    if (!result) {
      return false
    }

    // If attempts is less than attempsByIp, then is false
    if (result.attempts < attempsByIp) {
      return false
    }

    // If expirationTime is less than now, then is false
    if (result.expirationTime < Date.now()) {
      return false
    }

    return true
  }
}

export { MongoDBLoginRepository }
