// Domain
import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { SubDocumentRepository } from '../../domain/repositories/SubDocumentRepository'
// Infrastructure
import { ObjectId } from 'mongodb'
import { MongoDBConnection } from 'passager-backend-shared-kernel'

class MongoDBSubDocumentRepository implements SubDocumentRepository {


    constructor() {
    }

    getMongoDbCollection (collectionName: string) {
        const mongoDbClient = MongoDBConnection.getConnection()

        const database = mongoDbClient.db(process.env.COMMON_MONGODB_DATABASE)
        const collection = database.collection(collectionName)

        return collection
    }

    async create (documentEntity: SubDocumentEntity): Promise<SubDocumentEntity> {
        return null
        /*const collectionName = documentEntity.getCollection()
        const document = documentEntity.getPlainObject()
        const collection = this.getMongoDbCollection(collectionName)
        try{
            await collection.insertOne(document)
        }catch(e) {
            console.error(e)
            return null
        }

        // Map to DocumentEntity
        const documentEntityResult = await this.fromMongoDBDocumentToDocumentEntityMapper({
            collection: collectionName,
            documentPlainObject: document
        }).map()

        return documentEntityResult*/
    }
}

export { MongoDBSubDocumentRepository }
