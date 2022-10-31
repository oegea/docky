import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntity } from '../../domain/entities/DocumentEntity'

class GetDocumentService {
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

    const getDocumentResult = await this.documentRepository.get(documentEntity)

    if (getDocumentResult === null)
        throw new Error('GetDocumentService: error while getting a document')

    return getDocumentResult
  }
}

export { GetDocumentService }
