import { DocumentEntity } from './DocumentEntity'

class SubDocumentEntity extends DocumentEntity {
  private readonly parentId: string
  private readonly subCollection: string

  constructor ({
    id,
    collection,
    parentId,
    subCollection,
    documentPlainObject = {}
  }: {
    id: string
    collection: string
    parentId?: string
    subCollection?: string
    documentPlainObject?: object
  }) {
    super({ id, collection, documentPlainObject })
    this.parentId = parentId
    this.subCollection = subCollection
  }

  public getParentId (): string {
    return this.parentId
  }

  public getSubCollection (): string {
    return this.subCollection
  }

  public toJson (): object {
    const jsonResult = {
      id: this.id,
      ...this.getPlainObject()
    }

    return jsonResult
  }
}

export { SubDocumentEntity }
