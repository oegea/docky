import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { GetDocumentService } from './GetDocumentService'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'


class DeleteDocumentService {
  private readonly documentRepository: DocumentRepository
  private readonly getDocumentService: GetDocumentService
  private readonly getOperationPermissionsService: GetOperationPermissionsService

  constructor ({
    documentRepository,
    getDocumentService,
    getOperationPermissionsService
  }: {
    documentRepository: DocumentRepository,
    getDocumentService: GetDocumentService,
    getOperationPermissionsService: GetOperationPermissionsService
  }) {
    this.documentRepository = documentRepository
    this.getDocumentService = getDocumentService
    this.getOperationPermissionsService = getOperationPermissionsService
  }

  public async execute ({
    documentEntity
  }: {
    documentEntity: DocumentEntity
  }): Promise<Boolean> {

    const hasPermission = await this.getOperationPermissionsService.execute()
    if (!hasPermission)
      throw new Error('DeleteDocumentService: insufficient permissions to perform this operation')

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
