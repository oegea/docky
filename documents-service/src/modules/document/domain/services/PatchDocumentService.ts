import { DocumentEntity } from '../entities/DocumentEntity'
import { DocumentRepository } from '../repositories/DocumentRepository'

class PatchDocumentService {
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

    const documentUpdateResult = await this.documentRepository.patch(documentEntity)

    if (documentUpdateResult === null)
        throw new Error('PatchDocumentService: error while patching a document')

    return documentUpdateResult
  }
}

export { PatchDocumentService }
