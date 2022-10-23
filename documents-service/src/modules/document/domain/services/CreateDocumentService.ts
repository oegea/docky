import { CreateDocumentRequestValueObject } from '../valueObjects/CreateDocumentRequestValueObject'
import { DocumentRepository } from '../repositories/DocumentRepository'

class CreateDocumentService {
  private readonly documentRepository: DocumentRepository

  constructor ({
    documentRepository
  }: {
    documentRepository: DocumentRepository
  }) {
    this.documentRepository = documentRepository
  }

  public async execute ({
    createDocumentRequestValueObject
  }: {
    createDocumentRequestValueObject: CreateDocumentRequestValueObject
  }): Promise<object> {

    const documentCreationResult = await this.documentRepository.create(createDocumentRequestValueObject)

    if (documentCreationResult === null)
        throw new Error('CreateDocumentService: error while creating a new document')

    return documentCreationResult
  }
}

export { CreateDocumentService }
