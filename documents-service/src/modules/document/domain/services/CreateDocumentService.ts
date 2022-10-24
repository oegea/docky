import { CreateDocumentRequestValueObject } from '../valueObjects/CreateDocumentRequestValueObject'
import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntity } from '../../domain/entities/DocumentEntity'

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
  }): Promise<DocumentEntity> {

    const documentCreationResult = await this.documentRepository.create(createDocumentRequestValueObject)

    if (documentCreationResult === null)
        throw new Error('CreateDocumentService: error while creating a new document')

    return documentCreationResult
  }
}

export { CreateDocumentService }
