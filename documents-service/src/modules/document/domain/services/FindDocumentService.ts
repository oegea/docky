import { FindDocumentRequestValueObject } from '../valueObjects/FindDocumentRequestValueObject'
import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntityListValueObject } from '../../domain/valueObjects/DocumentEntityListValueObject'

class FindDocumentService {
  private readonly documentRepository: DocumentRepository

  constructor ({
    documentRepository
  }: {
    documentRepository: DocumentRepository
  }) {
    this.documentRepository = documentRepository
  }

  public async execute ({
    findDocumentRequestValueObject
  }: {
    findDocumentRequestValueObject: FindDocumentRequestValueObject
  }): Promise<DocumentEntityListValueObject> {

    const findResult = await this.documentRepository.find(findDocumentRequestValueObject)

    if (findResult === null)
        throw new Error('FindDocumentService: error while finding documents')

    return findResult
  }
}

export { FindDocumentService }
