import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { GetSubDocumentService } from './GetSubDocumentService'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'

class DeleteSubDocumentService {
  private readonly subDocumentRepository: SubDocumentRepository
  private readonly getSubDocumentService: GetSubDocumentService
  private readonly getOperationPermissionsService: GetOperationPermissionsService

  constructor ({
    subDocumentRepository,
    getSubDocumentService,
    getOperationPermissionsService
  }: {
    subDocumentRepository: SubDocumentRepository,
    getSubDocumentService: GetSubDocumentService,
    getOperationPermissionsService: GetOperationPermissionsService
  }) {
    this.subDocumentRepository = subDocumentRepository
    this.getSubDocumentService = getSubDocumentService
    this.getOperationPermissionsService = getOperationPermissionsService
  }

  public async execute ({
    subDocumentEntity
  }: {
    subDocumentEntity: SubDocumentEntity
  }): Promise<Boolean> {

    const hasPermission = await this.getOperationPermissionsService.execute()
    if (!hasPermission)
      throw new Error('DeleteSubDocumentService: insufficient permissions to perform this operation')

    try {
        await this.getSubDocumentService.execute({subDocumentEntity})
    }
    catch(e){
        return false
    }

    const deleteResult = await this.subDocumentRepository.delete(subDocumentEntity)

    return deleteResult
  }
}

export { DeleteSubDocumentService }
