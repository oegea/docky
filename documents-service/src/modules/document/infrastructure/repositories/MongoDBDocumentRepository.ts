// Domain
import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { DocumentEntityListValueObject } from '../../domain/valueObjects/DocumentEntityListValueObject'
import { DocumentRepository } from '../../domain/repositories/DocumentRepository'
import { FindDocumentRequestValueObject } from '../../domain/valueObjects/FindDocumentRequestValueObject'
import { FromMongoDBDocumentToDocumentEntityMapper } from '../mapper/FromMongoDBDocumentToDocumentEntityMapper'
import { FromMongoDBFindToDocumentEntityListMapper } from '../mapper/FromMongoDBFindToDocumentEntityListMapper'
// Infrastructure
import { ObjectId } from 'mongodb'
import { MongoDBConnection } from '@useful-tools/docky-shared-kernel'

class MongoDBDocumentRepository implements DocumentRepository {
  private readonly fromMongoDBDocumentToDocumentEntityMapper: ({ collection, documentPlainObject }: { collection: string, documentPlainObject: object }) => FromMongoDBDocumentToDocumentEntityMapper
  private readonly fromMongoDBFindToDocumentEntityListMapper: ({ collection, mongoDBFindResult }: {collection: string, mongoDBFindResult: any }) => FromMongoDBFindToDocumentEntityListMapper

  constructor ({
    fromMongoDBDocumentToDocumentEntityMapper,
    fromMongoDBFindToDocumentEntityListMapper
  }: {
    fromMongoDBDocumentToDocumentEntityMapper: ({ collection, documentPlainObject }: { collection: string, documentPlainObject: object }) => FromMongoDBDocumentToDocumentEntityMapper
    fromMongoDBFindToDocumentEntityListMapper: ({ collection, mongoDBFindResult }: {collection: string, mongoDBFindResult: any }) => FromMongoDBFindToDocumentEntityListMapper
  }) {
    this.fromMongoDBDocumentToDocumentEntityMapper = fromMongoDBDocumentToDocumentEntityMapper
    this.fromMongoDBFindToDocumentEntityListMapper = fromMongoDBFindToDocumentEntityListMapper
  }

  getMongoDbCollection (collectionName: string) {
    const mongoDbClient = MongoDBConnection.getConnection()

    const database = mongoDbClient.db(process.env.COMMON_MONGODB_DATABASE)
    const collection = database.collection(collectionName)

    return collection
  }

  async create (documentEntity: DocumentEntity): Promise<DocumentEntity> {
    const collectionName = documentEntity.getCollection()
    const document = documentEntity.getPlainObject()
    const collection = this.getMongoDbCollection(collectionName)
    try {
      await collection.insertOne(document)
    } catch (e) {
      console.error(e)
      return null
    }

    // Map to DocumentEntity
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
    try {
      await collection.deleteMany({ _id: new ObjectId(id) })
    } catch (e) {
      console.error(e)
      return false
    }

    return true
  }

  async get (documentEntity: DocumentEntity): Promise<DocumentEntity> {
    const collectionName = documentEntity.getCollection()
    const id = documentEntity.getId()

    const collection = this.getMongoDbCollection(collectionName)
    const result = await this.getMongoDBDocumentById(collection, id)

    if (result === null) { return null }

    // Map to DocumentEntity
    const documentEntityResult = await this.fromMongoDBDocumentToDocumentEntityMapper({
      collection: collectionName,
      documentPlainObject: result
    }).map()

    return documentEntityResult
  }

  private async getMongoDBDocumentById (collection: any, id: string): Promise<Object> {
    let result = null
    try {
      result = await collection.findOne({ _id: new ObjectId(id) })
    } catch (e) {
      console.error(e)
      return null
    }

    return result
  }

  async find (findDocumentRequestValueObject: FindDocumentRequestValueObject): Promise<DocumentEntityListValueObject> {
    const collectionName = findDocumentRequestValueObject.getCollection()
    const criteria = findDocumentRequestValueObject.getCriteria()

    const collection = this.getMongoDbCollection(collectionName)

    let result: DocumentEntityListValueObject
    try {
      const resultCursor = await collection.find(criteria)
      result = await this.fromMongoDBFindToDocumentEntityListMapper({ collection: collectionName, mongoDBFindResult: resultCursor }).map()
    } catch (e) {
      console.error(e)
      return null
    }

    return result
  }

  async patch (documentEntity: DocumentEntity): Promise<DocumentEntity> {
    const id = documentEntity.getId()
    const collectionName = documentEntity.getCollection()
    const document = documentEntity.getPlainObject()
    const collection = this.getMongoDbCollection(collectionName)

    try {
      await collection.updateOne({ _id: new ObjectId(id) }, {
        $set: document
      })

      const result = await this.getMongoDBDocumentById(collection, id)

      if (result === null) { return null }

      return await this.fromMongoDBDocumentToDocumentEntityMapper({
        collection: collectionName,
        documentPlainObject: result
      }).map()
    } catch (e) {
      console.error(e)
      return null
    }
  }
}

export { MongoDBDocumentRepository }
