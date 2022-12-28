import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'

class CreateDocumentService {
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
      throw new Error('CreateDocumentService: insufficient permissions to perform this operation')

    const documentCreationResult = await this.documentRepository.create(documentEntity)

    if (documentCreationResult === null)
        throw new Error('CreateDocumentService: error while creating a new document')

    return documentCreationResult
  }
}

export { CreateDocumentService }
