class GetDocumentRequestValueObject {

    private readonly collection: string
    private readonly id: string
  
    constructor ({
      collection,
      id
    }: {
      collection: string,
      id: string
    }) {
      this.collection = collection
      this.id = id
    }
  
    getCollection (): string {
      return this.collection
    }
  
  
    getId (): string {
      return this.id
    }  
  
  }
  
  export { GetDocumentRequestValueObject }
  