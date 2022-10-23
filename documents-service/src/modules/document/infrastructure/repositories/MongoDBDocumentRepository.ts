// Domain
import { DocumentRepository } from '../../domain/repositories/DocumentRepository'
import { CreateDocumentRequestValueObject } from '../../domain/valueObjects/CreateDocumentRequestValueObject'
// Infrastructure
import {MongoDBConnection} from 'passager-backend-shared-kernel'

class MongoDBDocumentRepository implements DocumentRepository {

    getMongoDbAuthCollection (collectionName: string) {
        const mongoDbClient = MongoDBConnection.getConnection()

        const database = mongoDbClient.db(process.env.COMMON_MONGODB_DATABASE)
        const collection = database.collection(collectionName)

        return collection
    }

    async create (createDocumentRequestValueObject: CreateDocumentRequestValueObject): Promise<object> {
        
        const collectionName = createDocumentRequestValueObject.getCollection()
        const document = createDocumentRequestValueObject.getDocument()
        const collection = this.getMongoDbAuthCollection(collectionName)
        try{
            await collection.insertOne(document)
        }catch(e) {
            console.error(e)
            return null
        }

        // TODO: Map id from MongoDB to a common domain format

        return document
    }
}

export { MongoDBDocumentRepository }
