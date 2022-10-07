// Domain
import { LoginRepository } from '../../domain/repositories/LoginRepository'
import { StartLoginRequestValueObject } from '../../domain/valueObjects/StartLoginRequestValueObject'
// Infrastructure
import {MongoDBConnection} from '../MongoDBConnection'
class MongoDBLoginRepository implements LoginRepository {
  async save (startLoginRequestValueObject: StartLoginRequestValueObject): Promise<boolean> {
    const mongoDbClient = MongoDBConnection.getConnection()

    const database = mongoDbClient.db(process.env.PASS_DATABASE)
        const collection = database.collection(process.env.PASS_COLLECTION)

        try{
            await collection.deleteMany({
                email: startLoginRequestValueObject.getEmail()
            });
    
            await collection.insertOne({
                email: startLoginRequestValueObject.getEmail(),
                number: startLoginRequestValueObject.getRandomNumber(),
                createdAt: new Date(Date.now())
            })
        }catch(e) {
            console.error(e)
            return false
        }

        return true
  }
}

export { MongoDBLoginRepository }
