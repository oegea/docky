import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { GetDocumentService } from './GetDocumentService'

class DeleteDocumentService {
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
  }): Promise<Boolean> {

    try {
      await this.getDocumentService.execute({documentEntity})
    }
    catch(e){
      return false
    }

    const deleteResult = await this.documentRepository.delete(documentEntity)

    return deleteResult
  }
}

export { DeleteDocumentService }
