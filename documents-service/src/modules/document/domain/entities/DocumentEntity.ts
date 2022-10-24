const INTERNAL_FIELDS_PREFIX = '_'

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
  

    getValuesFromPlainObject(document: object): {key: string, value: object}[] {
      const documentKeys = Object.keys(document)
      const values = documentKeys
        .filter((documentKey) => (documentKey.startsWith(INTERNAL_FIELDS_PREFIX) === false)) // starting with '_' is reserved to internal fields
        .map((documentKey) => ({key: documentKey, value: document[documentKey]}))
      return values
    }

    toJson() {
      let jsonResult = {
        id: this.id
      }

      this.values.forEach(keyValue => {
        jsonResult[keyValue.key] = keyValue.value
      })

      return jsonResult
    }

    async validate(): Promise<void>  {

    }
    
  
  }
  
  export { DocumentEntity }
  