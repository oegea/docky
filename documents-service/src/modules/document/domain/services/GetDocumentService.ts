import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'

class GetDocumentService {
  private readonly documentRepository: DocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService

  constructor ({
    documentRepository,
    getOperationPermissionsService
  }: {
    documentRepository: DocumentRepository
    getOperationPermissionsService: GetOperationPermissionsService
  }) {
    this.documentRepository = documentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
  }

  public async execute ({
    documentEntity
  }: {
    documentEntity: DocumentEntity
  }): Promise<DocumentEntity> {

    const hasPermission = await this.getOperationPermissionsService.execute()
    if (!hasPermission)
      throw new Error('GetDocumentService: insufficient permissions to perform this operation')

    const getDocumentResult = await this.documentRepository.get(documentEntity)

    if (getDocumentResult === null)
        throw new Error('GetDocumentService: error while getting a document')

    return getDocumentResult
  }
}

export { GetDocumentService }
