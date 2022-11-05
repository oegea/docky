import { DocumentEntity } from '../entities/DocumentEntity'
import { DocumentRepository } from '../repositories/DocumentRepository'
import { GetDocumentService } from './GetDocumentService'

class PatchDocumentService {
  private readonly documentRepository: DocumentRepository
  private readonly getDocumentService: GetDocumentService

  constructor ({
    documentRepository,
    getDocumentService
  }: {
    documentRepository: DocumentRepository,
    getDocumentService: GetDocumentService
  }) {
    this.documentRepository = documentRepository
    this.getDocumentService = getDocumentService
  }

  public async execute ({
    documentEntity
  }: {
    documentEntity: DocumentEntity
  }): Promise<DocumentEntity> {

    // Get the existing document
    const existingDocument = await this.getDocumentService.execute({documentEntity})

    // Merge documents
    const existingFields = existingDocument.getPlainObject()
    const updatedFields = documentEntity.getPlainObject()

    const mergeResult = {
        ...existingFields,
        ...updatedFields
    }

    const updatedDocument = new DocumentEntity({
        id: documentEntity.getId(),
        collection: documentEntity.getCollection(),
        documentPlainObject: mergeResult
    })

    const documentUpdateResult = await this.documentRepository.update(updatedDocument)

    if (documentUpdateResult === null ||  documentUpdateResult === false)
        throw new Error('PatchDocumentService: error while patching a document')

    return updatedDocument
  }
}

export { PatchDocumentService }
