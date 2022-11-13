export const INTERNAL_FIELDS_PREFIX = '_'
export const FIELD_ID_NAME = 'id'

class DocumentEntity {

    protected id: string
    protected collection: string
    protected values: {key: string, value: object}[]
  
    constructor ({
      id,
      collection,
      documentPlainObject = {}
    }: {
      id: string,
      collection: string,
      documentPlainObject?: object
    }) {
      this.id = id
      this.collection = collection
      this.values = this.getValuesFromPlainObject(documentPlainObject)
    }

    private getValuesFromPlainObject(document: object): {key: string, value: object}[] {
      if (document === null)
        return []

      const documentKeys = Object.keys(document)
      const values = documentKeys
        .map((documentKey) => ({key: documentKey, value: document[documentKey]}))
      return values
    }

    public getId() {
      return this.id
    }

    public setId(id: string) {
      this.id = id
    }

    public getCollection() {
      return this.collection
    }

    public getPlainObject() {
      let jsonResult = {
      }

      this.values.forEach(keyValue => {
        jsonResult[keyValue.key] = keyValue.value
      })

      return jsonResult
    }

    public toJson(): object {
      let jsonResult = {
        id: this.id,
        ...this.getPlainObject()
      }

      return jsonResult
    }

    public async validate(): Promise<void>  {
      if (this.hasInvalidFieldNames()){
        throw new Error('DocumentEntity: document contains invalid field names')
      }
    }

    private hasInvalidFieldNames(): boolean {
      const invalidFieldNames = this.values.filter((documentValue) => documentValue.key.startsWith(INTERNAL_FIELDS_PREFIX) || documentValue.key === FIELD_ID_NAME)

      return invalidFieldNames.length > 0
    }
  }
  
  export { DocumentEntity }
  