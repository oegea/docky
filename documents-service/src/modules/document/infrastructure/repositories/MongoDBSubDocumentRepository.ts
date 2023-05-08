// Domain
import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { SubDocumentRepository } from '../../domain/repositories/SubDocumentRepository'
import { SubDocumentEntityListValueObject } from '../../domain/valueObjects/SubDocumentEntityListValueObject'
import { FindSubDocumentRequestValueObject } from '../../domain/valueObjects/FindSubDocumentRequestValueObject'
// import { FromMongoDBDocumentToDocumentEntityMapper } from '../mapper/FromMongoDBDocumentToDocumentEntityMapper'
import { FromMongoDBFindToSubDocumentEntityListMapper } from '../mapper/FromMongoDBFindToSubDocumentEntityListMapper'
// Infrastructure
import { ObjectId } from 'mongodb'
import { MongoDBConnection } from '@useful-tools/docky-shared-kernel'

class MongoDBSubDocumentRepository implements SubDocumentRepository {
  private readonly fromMongoDBFindToSubDocumentEntityListMapper: ({
    collection,
    parentId,
    subCollection,
    mongoDBFindResult
  }: {
    collection: string
    parentId: string
    subCollection: string
    mongoDBFindResult: object[]
  }) => FromMongoDBFindToSubDocumentEntityListMapper

  constructor ({
    fromMongoDBFindToSubDocumentEntityListMapper
  }: {
    fromMongoDBFindToSubDocumentEntityListMapper: ({
      collection,
      parentId,
      subCollection,
      mongoDBFindResult
    }: {
      collection: string
      parentId: string
      subCollection: string
      mongoDBFindResult: object[]
    }) => FromMongoDBFindToSubDocumentEntityListMapper
  }) {
    this.fromMongoDBFindToSubDocumentEntityListMapper = fromMongoDBFindToSubDocumentEntityListMapper
  }

  // TODO: Move this to a common class to handle common MongoDb operations
  getMongoDbCollection (collectionName: string) {
    const mongoDbClient = MongoDBConnection.getConnection()

    const database = mongoDbClient.db(process.env.COMMON_MONGODB_DATABASE)
    const collection = database.collection(collectionName)

    return collection
  }

  private async getMongoDBSubDocumentById (collection: any, parentId: string, id: string, subCollection: string): Promise<Object> {
    let result = null
    try {
      result = await collection.findOne(
        {
          _id: new ObjectId(parentId),
          [`_${subCollection}._id`]: new ObjectId(id)
        },
        {
          projection: {
            _id: 0,
            [`_${subCollection}.$`]: 1
          }
        }
      )
    } catch (e) {
      console.error(e)
      return null
    }

    if (
      result !== null &&
            result.hasOwnProperty(`_${subCollection}`) &&
            Array.isArray(result[`_${subCollection}`]) &&
            result[`_${subCollection}`].length === 1
    ) { return result[`_${subCollection}`][0] }

    return null
  }

  private getPlainSubDocument (subDocumentEntity: SubDocumentEntity): object {
    return {
      _id: new ObjectId(),
      ...subDocumentEntity.getPlainObject()
    }
  }

  private async insertSubDocument (subDocumentEntity: SubDocumentEntity, plainSubDocument: any): Promise<string> {
    const collectionName = subDocumentEntity.getCollection()
    const subCollectionName = subDocumentEntity.getSubCollection()
    const parentId = subDocumentEntity.getParentId()
    const collection = this.getMongoDbCollection(collectionName)

    try {
      await collection.updateOne({ _id: new ObjectId(parentId) }, {
        $push: {
          [`_${subCollectionName}`]: plainSubDocument
        }
      })
      return plainSubDocument._id.toString()
    } catch (e) {
      return null
    }
  }

  async create (subDocumentEntity: SubDocumentEntity): Promise<SubDocumentEntity> {
    const plainSubDocument = this.getPlainSubDocument(subDocumentEntity)
    const subDocumentId = await this.insertSubDocument(subDocumentEntity, plainSubDocument)

    if (subDocumentId === null) { return null }

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

    if (result === null) { return null }

    const documentPlainObject: any = {
      ...result
    }
    delete documentPlainObject._id

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
      await collection.updateOne({ _id: new ObjectId(parentId) }, {
        $pull: {
          [`_${subCollection}`]: {
            _id: new ObjectId(id)
          }
        }
      })
      return true
    } catch (e) {
      return false
    }
  }

  private async getAllSubDocumentsFromParent (findSubDocumentRequestValueObject: FindSubDocumentRequestValueObject): Promise<object[]> {
    const collectionName = findSubDocumentRequestValueObject.getCollection()
    const subCollection = findSubDocumentRequestValueObject.getSubCollection()
    const parentId = findSubDocumentRequestValueObject.getParentId()

    const collection = this.getMongoDbCollection(collectionName)

    let result = null
    try {
      result = await collection.findOne(
        {
          _id: new ObjectId(parentId)
        },
        {
          projection: {
            _id: 0,
            [`_${subCollection}`]: 1
          }
        }
      )
    } catch (e) {
      console.error(e)
      return null
    }

    if (
      result !== null &&
            result.hasOwnProperty(`_${subCollection}`) &&
            Array.isArray(result[`_${subCollection}`])
    ) { return result[`_${subCollection}`] }

    return []
  }

  // Why is this outside domain? Because the database has the responsibility of filtering results
  // As a temporary solution until we have a better way to handle this, we will filter the results manually
  // Filtering records should not be part of the business logic
  private async filterSubDocuments (criteria: object, subDocuments: object[]): Promise<object[]> {
    const filteredSubDocuments = []
    for (const subDocument of subDocuments) {
      let match = true
      for (const criteriaKey of Object.keys(criteria)) {
        if (criteria[criteriaKey] !== subDocument[criteriaKey]) {
          match = false
          break
        }
      }

      if (!match) { continue }

      filteredSubDocuments.push(subDocument)
    }
    return filteredSubDocuments
  }

  async find (findSubDocumentRequestValueObject: FindSubDocumentRequestValueObject): Promise<SubDocumentEntityListValueObject> {
    const subDocuments = await this.getAllSubDocumentsFromParent(findSubDocumentRequestValueObject)

    if (subDocuments === null) { return null }

    const criteria = findSubDocumentRequestValueObject.getCriteria()
    const filteredSubDocuments = await this.filterSubDocuments(criteria, subDocuments)

    const subDocumentEntityListValueObject = await this.fromMongoDBFindToSubDocumentEntityListMapper({
      parentId: findSubDocumentRequestValueObject.getParentId(),
      collection: findSubDocumentRequestValueObject.getCollection(),
      subCollection: findSubDocumentRequestValueObject.getSubCollection(),
      mongoDBFindResult: filteredSubDocuments
    }).map()

    return subDocumentEntityListValueObject
  }

  async patch (subDocumentEntity: SubDocumentEntity): Promise<SubDocumentEntity> {
    const collectionName = subDocumentEntity.getCollection()
    const subCollection = subDocumentEntity.getSubCollection()
    const id = subDocumentEntity.getId()
    const parentId = subDocumentEntity.getParentId()
    const plainObject = subDocumentEntity.getPlainObject()

    const collection = this.getMongoDbCollection(collectionName)

    const plainSubDocument = {
      _id: new ObjectId(id),
      ...plainObject
    }

    try {
      await collection.updateOne({ _id: new ObjectId(parentId) }, {
        $set: {
          [`_${subCollection}.$[element]`]: plainSubDocument
        }
      }, {
        arrayFilters: [
          {
            'element._id': new ObjectId(id)
          }
        ]
      })
      return subDocumentEntity
    } catch (e) {
      return null
    }
  }
}

export { MongoDBSubDocumentRepository }
