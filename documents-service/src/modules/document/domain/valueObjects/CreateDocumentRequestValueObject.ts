class CreateDocumentRequestValueObject {

  private readonly collection: string
  private readonly document: object

  constructor ({
    collection,
    document
  }: {
    collection: string,
    document: object
  }) {
    this.collection = collection
    this.document = document
  }

  getCollection (): string {
    return this.collection
  }


  getDocument (): object {
    return this.document
  }  

}

export { CreateDocumentRequestValueObject }
