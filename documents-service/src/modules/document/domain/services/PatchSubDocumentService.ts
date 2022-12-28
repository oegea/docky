import { SubDocumentEntity } from '../entities/SubDocumentEntity'
import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'

class PatchSubDocumentService {
  private readonly subDocumentRepository: SubDocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService

  constructor ({
    subDocumentRepository,
    getOperationPermissionsService
  }: {
    subDocumentRepository: SubDocumentRepository,
    getOperationPermissionsService: GetOperationPermissionsService
  }) {
    this.subDocumentRepository = subDocumentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
  }

  public async execute ({
    subDocumentEntity
  }: {
    subDocumentEntity: SubDocumentEntity
  }): Promise<SubDocumentEntity> {

    const hasPermission = await this.getOperationPermissionsService.execute()
    if (!hasPermission)
      throw new Error('PatchSubDocumentService: insufficient permissions to perform this operation')

    const documentUpdateResult = await this.subDocumentRepository.patch(subDocumentEntity)

    if (documentUpdateResult === null)
        throw new Error('PatchSubDocumentService: error while patching a sub document')

    return documentUpdateResult
  }
}

export { PatchSubDocumentService }
