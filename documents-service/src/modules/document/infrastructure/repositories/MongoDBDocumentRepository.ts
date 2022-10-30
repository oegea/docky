// Domain
import { DocumentRepository } from '../../domain/repositories/DocumentRepository'
import { CreateDocumentRequestValueObject } from '../../domain/valueObjects/CreateDocumentRequestValueObject'
import { DocumentEntity } from '../../domain/entities/DocumentEntity'
// Infrastructure
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

    getMongoDbAuthCollection (collectionName: string) {
        const mongoDbClient = MongoDBConnection.getConnection()

        const database = mongoDbClient.db(process.env.COMMON_MONGODB_DATABASE)
        const collection = database.collection(collectionName)

        return collection
    }

    async create (createDocumentRequestValueObject: CreateDocumentRequestValueObject): Promise<DocumentEntity> {
        
        const collectionName = createDocumentRequestValueObject.getCollection()
        const document = createDocumentRequestValueObject.getDocument()
        const collection = this.getMongoDbAuthCollection(collectionName)
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
}

export { MongoDBDocumentRepository }
