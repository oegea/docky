class FindSubDocumentRequestValueObject {
  private readonly collection: string
  private readonly parentId: string
  private readonly subCollection: string
  private readonly criteria: object

  constructor ({
    collection,
    parentId,
    subCollection,
    criteria
  }: {
    collection: string
    parentId: string
    subCollection: string
    criteria: object
  }) {
    this.collection = collection
    this.parentId = parentId
    this.subCollection = subCollection
    this.criteria = criteria
  }

  getCollection (): string {
    return this.collection
  }

  getCriteria (): object {
    return this.criteria
  }

  getParentId (): string {
    return this.parentId
  }

  getSubCollection (): string {
    return this.subCollection
  }
}

export { FindSubDocumentRequestValueObject }
