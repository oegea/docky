// Domain
import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { SubDocumentRepository } from '../../domain/repositories/SubDocumentRepository'
// Infrastructure
import { ObjectId } from 'mongodb'
import { MongoDBConnection } from 'passager-backend-shared-kernel'

class MongoDBSubDocumentRepository implements SubDocumentRepository {

    constructor() {
    }

    // TODO: Move this to a common class to handle common MongoDb operations
    getMongoDbCollection (collectionName: string) {
        const mongoDbClient = MongoDBConnection.getConnection()

        const database = mongoDbClient.db(process.env.COMMON_MONGODB_DATABASE)
        const collection = database.collection(collectionName)

        return collection
    }

    private getPlainSubDocument (subDocumentEntity: SubDocumentEntity): object {
        return {
            _id: new ObjectId(),
            ...subDocumentEntity.getPlainObject()
        }
    }

    private async insertSubDocument (subDocumentEntity: SubDocumentEntity, plainSubDocument: object): Promise<string> {
        const collectionName = subDocumentEntity.getCollection()
        const subCollectionName = subDocumentEntity.getSubCollection()
        const parentId = subDocumentEntity.getParentId()
        const collection = this.getMongoDbCollection(collectionName)

        try {
            await collection.updateOne({'_id': new ObjectId(parentId)}, {
                "$push": {
                    [`_${subCollectionName}`]: plainSubDocument
                }
            })
            return plainSubDocument['_id'].toString()
        } catch (e) {
            return null
        }
    }

    async create (subDocumentEntity: SubDocumentEntity): Promise<SubDocumentEntity> {

        const plainSubDocument = this.getPlainSubDocument(subDocumentEntity)
        const subDocumentId = await this.insertSubDocument(subDocumentEntity, plainSubDocument)

        if (subDocumentId === null)
            return null

        subDocumentEntity.setId(subDocumentId)

        return subDocumentEntity
    }
}

export { MongoDBSubDocumentRepository }
