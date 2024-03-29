import { DocumentEntity, INTERNAL_FIELDS_PREFIX } from '../../domain/entities/DocumentEntity'

class FromMongoDBDocumentToDocumentEntityMapper {
  protected readonly collection: string
  protected readonly documentPlainObject: any
  private readonly documentEntity: ({ id, collection, documentPlainObject }: {id: string, collection: string, documentPlainObject: any}) => Promise<DocumentEntity>

  constructor ({
    collection,
    documentEntity,
    documentPlainObject = {}
  }: {
    collection: string
    documentEntity: ({ id, collection, documentPlainObject }: {id: string, collection: string, documentPlainObject: any}) => Promise<DocumentEntity>
    documentPlainObject?: any
  }) {
    this.collection = collection
    this.documentEntity = documentEntity
    this.documentPlainObject = documentPlainObject
  }

  protected removeInternalFields (documentPlainObject: any): object {
    const documentKeys = Object.keys(documentPlainObject)
    const filteredDocument = documentKeys.reduce((documentObject, documentKey) => {
      if (documentKey.startsWith(INTERNAL_FIELDS_PREFIX)) {
        return documentObject
      }

      documentObject[documentKey] = documentPlainObject[documentKey]
      return documentObject
    }, {})
    return filteredDocument
  }

  public async map (): Promise<DocumentEntity> {
    // Fields starting with underscore are internal fields and must be removed
    const filteredDocument = this.removeInternalFields(this.documentPlainObject)
    const documentEntityResult = await this.documentEntity({
      id: `${this.documentPlainObject._id}`,
      collection: this.collection,
      documentPlainObject: filteredDocument
    })
    return documentEntityResult
  }
}

export { FromMongoDBDocumentToDocumentEntityMapper }
