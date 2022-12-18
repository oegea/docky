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

    private async getMongoDBSubDocumentById(collection: any, parentId: string, id: string, subCollection: string): Promise<Object> {
        let result = null
        try{
            result = await collection.findOne(
                {
                    '_id': new ObjectId(parentId),
                    [`_${subCollection}._id`]: new ObjectId(id)
                },
                {
                    projection: {
                        '_id': 0, 
                        [`_${subCollection}.$`]: 1
                    }
                }
            )

        }catch(e) {
            console.error(e)
            return null
        }

        if (
            result !== null && 
            result.hasOwnProperty(`_${subCollection}`) &&
            Array.isArray(result[`_${subCollection}`]) &&
            result[`_${subCollection}`].length === 1
        )
            return result[`_${subCollection}`][0]
        
        return null
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

    async get (subDocumentEntity: SubDocumentEntity): Promise<SubDocumentEntity> {
        const collectionName = subDocumentEntity.getCollection()
        const subCollection = subDocumentEntity.getSubCollection()
        const id = subDocumentEntity.getId()
        const parentId = subDocumentEntity.getParentId()

        const collection = this.getMongoDbCollection(collectionName)

        const result = await this.getMongoDBSubDocumentById(collection, parentId, id, subCollection)

        if (result === null)
            return null

        let documentPlainObject = {
            ...result
        }
        delete documentPlainObject['_id']

        await subDocumentEntity.setDocumentPlainObject(documentPlainObject)

        return subDocumentEntity
    }

    async delete (subDocumentEntity: SubDocumentEntity): Promise<boolean> {
        const collectionName = subDocumentEntity.getCollection()
        const subCollection = subDocumentEntity.getSubCollection()
        const id = subDocumentEntity.getId()
        const parentId = subDocumentEntity.getParentId()

        const collection = this.getMongoDbCollection(collectionName)

        try {
            await collection.updateOne({'_id': new ObjectId(parentId)}, {
                "$pull": {
                    [`_${subCollection}`]: {
                        '_id': new ObjectId(id)
                    }
                }
            })
            return true
        } catch (e) {
            return false
        }

    }
}

export { MongoDBSubDocumentRepository }
