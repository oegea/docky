import { DocumentEntity } from '../entities/DocumentEntity'

class DocumentEntityListValueObject {
  private readonly documents: DocumentEntity[]

  constructor () {
    this.documents = []
  }

  addDocument ({ document }: {document: DocumentEntity}): void {
    this.documents.push(document)
  }

  toJson () {
    const result = []
    for (const i in this.documents) {
      const document = this.documents[i]
      result.push(document.toJson())
    }

    return result
  }
}

export { DocumentEntityListValueObject }
