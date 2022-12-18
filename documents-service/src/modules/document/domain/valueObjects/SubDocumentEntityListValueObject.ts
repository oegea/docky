import { SubDocumentEntity } from '../entities/SubDocumentEntity'

class SubDocumentEntityListValueObject {

  private readonly documents: SubDocumentEntity[]

  constructor () {
    this.documents = []
  }

  addDocument ({document}: {document: SubDocumentEntity}): void {
    this.documents.push(document)
  }


  toJson() {
      const result = []
      for (let i in this.documents) {
          const document = this.documents[i]
          result.push(document.toJson())
      }

      return result
  } 
  
}
  
export { SubDocumentEntityListValueObject }
  