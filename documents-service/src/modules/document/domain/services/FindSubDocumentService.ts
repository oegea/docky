import { FindSubDocumentRequestValueObject } from '../valueObjects/FindSubDocumentRequestValueObject'
import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { SubDocumentEntityListValueObject } from '../../domain/valueObjects/SubDocumentEntityListValueObject'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'

class FindSubDocumentService {
  private readonly subDocumentRepository: SubDocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService

  constructor ({
    subDocumentRepository,
    getOperationPermissionsService
  }: {
    subDocumentRepository: SubDocumentRepository
    getOperationPermissionsService: GetOperationPermissionsService
  }) {
    this.subDocumentRepository = subDocumentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
  }

  public async execute ({
    findSubDocumentRequestValueObject
  }: {
    findSubDocumentRequestValueObject: FindSubDocumentRequestValueObject
  }): Promise<SubDocumentEntityListValueObject> {

    const hasPermission = await this.getOperationPermissionsService.execute()
    if (!hasPermission)
      throw new Error('FindSubDocumentService: insufficient permissions to perform this operation')

    const findResult = await this.subDocumentRepository.find(findSubDocumentRequestValueObject)

    if (findResult === null)
        throw new Error('FindSubDocumentService: error while finding documents')

    return findResult
  }
}

export { FindSubDocumentService }
