export const INTERNAL_FIELDS_PREFIX = '_'

class DocumentEntity {

    private readonly id: string
    private readonly collection: string
    private readonly parentId: String
    private readonly subCollection: string
    private readonly values: {key: string, value: object}[]
  
    constructor ({
      id,
      collection,
      parentId = null,
      subCollection = null,
      documentPlainObject = {}
    }: {
      id: string,
      collection: string,
      parentId?: string,
      subCollection?: string,
      documentPlainObject?: object
    }) {
      this.id = id
      this.collection = collection
      this.parentId = parentId
      this.subCollection = subCollection

      this.values = this.getValuesFromPlainObject(documentPlainObject)
    }

    private getValuesFromPlainObject(document: object): {key: string, value: object}[] {
      const documentKeys = Object.keys(document)
      const values = documentKeys
        .map((documentKey) => ({key: documentKey, value: document[documentKey]}))
      return values
    }

    public getId() {
      return this.id
    }

    public getCollection() {
      return this.collection
    }

    public toJson() {
      let jsonResult = {
        id: this.id
      }

      this.values.forEach(keyValue => {
        jsonResult[keyValue.key] = keyValue.value
      })

      return jsonResult
    }

    public async validate(): Promise<void>  {
      if (this.hasInvalidFieldNames()){
        throw new Error('DocumentEntity: document contains invalid field names')
      }
    }

    private hasInvalidFieldNames(): boolean {
      const invalidFieldNames = this.values.filter((documentValue) => documentValue.key.startsWith(INTERNAL_FIELDS_PREFIX))

      return invalidFieldNames.length > 0
    }
  }
  
  export { DocumentEntity }
  