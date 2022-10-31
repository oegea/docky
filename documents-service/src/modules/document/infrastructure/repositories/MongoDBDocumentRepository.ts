// Domain
import { DocumentRepository } from '../../domain/repositories/DocumentRepository'
import { CreateDocumentRequestValueObject } from '../../domain/valueObjects/CreateDocumentRequestValueObject'
import { DocumentEntity } from '../../domain/entities/DocumentEntity'
// Infrastructure
import { ObjectId } from 'mongodb'
import {MongoDBConnection} from 'passager-backend-shared-kernel'
import {FromMongoDBDocumentToDocumentEntityMapper} from '../mapper/FromMongoDBDocumentToDocumentEntityMapper'

class MongoDBDocumentRepository implements DocumentRepository {

    private readonly fromMongoDBDocumentToDocumentEntityMapper: ({ collection, documentPlainObject }: { collection: string, documentPlainObject: object }) => FromMongoDBDocumentToDocumentEntityMapper

    constructor({
        fromMongoDBDocumentToDocumentEntityMapper
    }: {
        fromMongoDBDocumentToDocumentEntityMapper: ({ collection, documentPlainObject }: { collection: string, documentPlainObject: object }) => FromMongoDBDocumentToDocumentEntityMapper
    }) {
        this.fromMongoDBDocumentToDocumentEntityMapper = fromMongoDBDocumentToDocumentEntityMapper
    }

    getMongoDbCollection (collectionName: string) {
        const mongoDbClient = MongoDBConnection.getConnection()

        const database = mongoDbClient.db(process.env.COMMON_MONGODB_DATABASE)
        const collection = database.collection(collectionName)

        return collection
    }

    async create (createDocumentRequestValueObject: CreateDocumentRequestValueObject): Promise<DocumentEntity> {
        
        const collectionName = createDocumentRequestValueObject.getCollection()
        const document = createDocumentRequestValueObject.getDocument()
        const collection = this.getMongoDbCollection(collectionName)
        try{
            await collection.insertOne(document)
        }catch(e) {
            console.error(e)
            return null
        }

        // Map id from MongoDB to a common domain format
        const documentEntityResult = await this.fromMongoDBDocumentToDocumentEntityMapper({
            collection: collectionName,
            documentPlainObject: document
        }).map()

        return documentEntityResult
    }

    async delete (documentEntity: DocumentEntity): Promise<Boolean> {
        const collectionName = documentEntity.getCollection()
        const id = documentEntity.getId()

        const collection = this.getMongoDbCollection(collectionName)
        try{
           await collection.deleteMany({'_id': new ObjectId(id)})
        }catch(e) {
            console.error(e)
            return false
        }

        return true
    }

    async get (documentEntity: DocumentEntity): Promise<DocumentEntity> {
        const collectionName = documentEntity.getCollection()
        const id = documentEntity.getId()

        const collection = this.getMongoDbCollection(collectionName)
        let result = null
        try{
            result = await collection.findOne({'_id': new ObjectId(id)})
        }catch(e) {
            console.error(e)
            return null
        }
        
        if(result === null)
            return null

        // Map id from MongoDB to a common domain format
        const documentEntityResult = await this.fromMongoDBDocumentToDocumentEntityMapper({
            collection: collectionName,
            documentPlainObject: result
        }).map()

        return documentEntityResult
    }
}

export { MongoDBDocumentRepository }
