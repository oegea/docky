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

  async validate (): Promise<void> {
    // TODO: Validate that collection is part of the application config
  }


  getCollection (): string {
    return this.collection
  }


  getDocument (): object {
    return this.document
  }  

}

export { CreateDocumentRequestValueObject }
