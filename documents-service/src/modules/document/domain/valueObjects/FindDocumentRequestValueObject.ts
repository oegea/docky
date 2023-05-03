class FindDocumentRequestValueObject {
  private readonly collection: string
  private readonly criteria: object

  constructor ({
    collection,
    criteria
  }: {
    collection: string
    criteria: object
  }) {
    this.collection = collection
    this.criteria = criteria
  }

  getCollection (): string {
    return this.collection
  }

  getCriteria (): object {
    return this.criteria
  }
}

export { FindDocumentRequestValueObject }
