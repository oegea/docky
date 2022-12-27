import { INTERNAL_FIELDS_PREFIX } from '../../domain/entities/DocumentEntity'
import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { FromMongoDBDocumentToDocumentEntityMapper } from './FromMongoDBDocumentToDocumentEntityMapper'

class FromMongoDBSubDocumentToSubDocumentEntityMapper extends FromMongoDBDocumentToDocumentEntityMapper {

    private readonly parentId: string
    private readonly subCollection: string
    private readonly subDocumentEntity: ({
        collection,
        documentPlainObject = {},
        id,
        parentId,
        subCollection
      }: {
        collection: string,
        documentPlainObject: object,
        id: string,
        parentId: string,
        subCollection: string
      }) => Promise<SubDocumentEntity>
  
    constructor ({
      collection,
      parentId,
      subCollection,
      subDocumentEntity,
      documentPlainObject = {}
    }: {
      collection: string,
      parentId: string,
      subCollection: string,
      subDocumentEntity: ({
        collection,
        documentPlainObject = {},
        id,
        parentId,
        subCollection
      }: {
        collection: string,
        documentPlainObject: object,
        id: string,
        parentId: string,
        subCollection: string
      }) => Promise<SubDocumentEntity>
      documentPlainObject?: object
    }) {
      super({collection, documentPlainObject, documentEntity: null})
      this.parentId = parentId
      this.subCollection = subCollection
      this.subDocumentEntity = subDocumentEntity
    }
  
    public async map(): Promise<SubDocumentEntity> {
      // Fields starting with underscore are internal fields and must be removed
      const filteredDocument = this.removeInternalFields(this.documentPlainObject)
      const subDocumentEntityResult = await this.subDocumentEntity({
        id: `${this.documentPlainObject['_id']}`,
        collection: this.collection,
        documentPlainObject: filteredDocument,
        parentId: this.parentId,
        subCollection: this.subCollection
      })
      return subDocumentEntityResult
    } 
  
  }
  
  export { FromMongoDBSubDocumentToSubDocumentEntityMapper }
  