import { SubDocumentEntityListValueObject } from '../../domain/valueObjects/SubDocumentEntityListValueObject'
import { subDocumentEntityListValueObject } from '../../domain/valueObjects/factory'
import { FromMongoDBSubDocumentToSubDocumentEntityMapper } from './FromMongoDBSubDocumentToSubDocumentEntityMapper'

class FromMongoDBFindToSubDocumentEntityListMapper {

    private readonly collection: string
    private readonly parentId: string
    private readonly subCollection: string
    private readonly mongoDBFindResult: Array<object>
    private readonly fromMongoDBSubDocumentToSubDocumentEntityMapper: ({
      collection,
      documentPlainObject,
      parentId,
      subCollection
  }: {
      collection: string,
      documentPlainObject: object,
      parentId: string,
      subCollection: string
  }) => FromMongoDBSubDocumentToSubDocumentEntityMapper
  
    constructor ({
      collection,
      parentId,
      subCollection,
      mongoDBFindResult,
      fromMongoDBSubDocumentToSubDocumentEntityMapper
    }: {
      collection: string,
      parentId: string,
      subCollection: string,
      mongoDBFindResult: Array<object>
      fromMongoDBSubDocumentToSubDocumentEntityMapper: ({
        collection,
        documentPlainObject,
        parentId,
        subCollection
      }: {
        collection: string,
        documentPlainObject: object,
        parentId: string,
        subCollection: string
      }) => FromMongoDBSubDocumentToSubDocumentEntityMapper
    }) {
      this.collection = collection
      this.parentId = parentId
      this.subCollection = subCollection
      this.mongoDBFindResult = mongoDBFindResult
      this.fromMongoDBSubDocumentToSubDocumentEntityMapper = fromMongoDBSubDocumentToSubDocumentEntityMapper
    }
  
    public async map(): Promise<SubDocumentEntityListValueObject> {
        const documentList = await subDocumentEntityListValueObject()

        for (let i = 0; i < this.mongoDBFindResult.length; i++) {
            const document = this.mongoDBFindResult[i]

            // Map to DocumentEntity
            const documentEntityResult = await this.fromMongoDBSubDocumentToSubDocumentEntityMapper({
                collection: this.collection,
                parentId: this.parentId,
                subCollection: this.subCollection,
                documentPlainObject: document
            }).map()

            documentList.addDocument({document: documentEntityResult})
        }
        return documentList
    } 
  
  }
  
  export { FromMongoDBFindToSubDocumentEntityListMapper }
  