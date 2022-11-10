import { DocumentEntity } from "./DocumentEntity"

class SubDocumentEntity extends DocumentEntity {

    private readonly parentId: String
    private readonly subCollection: string
  
    constructor ({
      id,
      collection,
      parentId,
      subCollection,
      documentPlainObject = {}
    }: {
      id: string,
      collection: string,
      parentId?: string,
      subCollection?: string,
      documentPlainObject?: object
    }) {
      super({id, collection, documentPlainObject})
      this.parentId = parentId
      this.subCollection = subCollection
    }

    public getParentId(): String{
      return this.parentId
    }

    public getSubCollection(): String {
      return this.subCollection
    }

    public toJson(): object {
      let jsonResult = {
        id: this.id,
        ...this.getPlainObject()
      }

      return jsonResult
    }

  }
  
  export { SubDocumentEntity }
  