import { DocumentEntity } from '../entities/DocumentEntity'
import { DocumentRepository } from '../repositories/DocumentRepository'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'

class PatchDocumentService {
  private readonly documentRepository: DocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService

  constructor ({
    documentRepository,
    getOperationPermissionsService
  }: {
    documentRepository: DocumentRepository,
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
      throw new Error('PatchDocumentService: insufficient permissions to perform this operation')

    const documentUpdateResult = await this.documentRepository.patch(documentEntity)

    if (documentUpdateResult === null)
        throw new Error('PatchDocumentService: error while patching a document')

    return documentUpdateResult
  }
}

export { PatchDocumentService }
