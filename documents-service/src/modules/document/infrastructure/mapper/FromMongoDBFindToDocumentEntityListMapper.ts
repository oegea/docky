import { DocumentEntityListValueObject } from '../../domain/valueObjects/DocumentEntityListValueObject'
import { documentEntityListValueObject } from '../../domain/valueObjects/factory'
import { FromMongoDBDocumentToDocumentEntityMapper } from './FromMongoDBDocumentToDocumentEntityMapper'

class FromMongoDBFindToDocumentEntityListMapper {

    private readonly collection: string
    private readonly mongoDBFindResult: any
    private readonly fromMongoDBDocumentToDocumentEntityMapper: ({ collection, documentPlainObject}: {collection: string, documentPlainObject: object }) => FromMongoDBDocumentToDocumentEntityMapper
  
    constructor ({
      collection,
      mongoDBFindResult,
      fromMongoDBDocumentToDocumentEntityMapper
    }: {
      collection: string,
      mongoDBFindResult: any
      fromMongoDBDocumentToDocumentEntityMapper: ({ collection, documentPlainObject}: {collection: string, documentPlainObject: object }) => FromMongoDBDocumentToDocumentEntityMapper
    }) {
      this.collection = collection
      this.mongoDBFindResult = mongoDBFindResult
      this.fromMongoDBDocumentToDocumentEntityMapper = fromMongoDBDocumentToDocumentEntityMapper
    }
  
    public async map(): Promise<DocumentEntityListValueObject> {
        const resultArray = await this.mongoDBFindResult.toArray()
        const documentList = await documentEntityListValueObject()

        for (let i = 0; i < resultArray.length; i++) {
            const document = resultArray[i]

            // Map to DocumentEntity
            const documentEntityResult = await this.fromMongoDBDocumentToDocumentEntityMapper({
                collection: this.collection,
                documentPlainObject: document
            }).map()

            documentList.addDocument({document: documentEntityResult})
        }
        return documentList
    } 
  
  }
  
  export { FromMongoDBFindToDocumentEntityListMapper }
  