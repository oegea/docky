import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'

class GetSubDocumentService {
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
      throw new Error('GetSubDocumentService: insufficient permissions to perform this operation')

    const getSubDocumentResult = await this.subDocumentRepository.get(subDocumentEntity)

    if (getSubDocumentResult === null)
        throw new Error('GetSubDocumentService: error while getting a document')

    return getSubDocumentResult
  }
}

export { GetSubDocumentService }
