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
    documentEntity
  }: {
    documentEntity: DocumentEntity
  }): Promise<DocumentEntity> {

    const documentCreationResult = await this.documentRepository.create(documentEntity)

    if (documentCreationResult === null)
        throw new Error('CreateDocumentService: error while creating a new document')

    return documentCreationResult
  }
}

export { CreateDocumentService }
