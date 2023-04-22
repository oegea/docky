import { FindSubDocumentRequestValueObject } from '../valueObjects/FindSubDocumentRequestValueObject'
import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { SubDocumentEntityListValueObject } from '../../domain/valueObjects/SubDocumentEntityListValueObject'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'
import { OperationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/OperationPayloadPermissionsValueObject'

class FindSubDocumentService {
  private readonly subDocumentRepository: SubDocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService
  private readonly operationPayloadPermissionsValueObject: ({ collection, id, subCollection, parentId, operationType, payload }: { collection: string; id: string; subCollection: string; parentId: string; operationType: string; payload: any; }) => Promise<OperationPayloadPermissionsValueObject>

  constructor ({
    subDocumentRepository,
    getOperationPermissionsService,
    operationPayloadPermissionsValueObject
  }: {
    subDocumentRepository: SubDocumentRepository,
    getOperationPermissionsService: GetOperationPermissionsService,
    operationPayloadPermissionsValueObject: ({ collection, id, subCollection, parentId, operationType, payload }: { collection: string; id: string; subCollection: string; parentId: string; operationType: string; payload: any; }) => Promise<OperationPayloadPermissionsValueObject>
  }) {
    this.subDocumentRepository = subDocumentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
    this.operationPayloadPermissionsValueObject = operationPayloadPermissionsValueObject
  }

  public async execute ({
    findSubDocumentRequestValueObject
  }: {
    findSubDocumentRequestValueObject: FindSubDocumentRequestValueObject
  }): Promise<SubDocumentEntityListValueObject> {

    const operationPayloadPermissionsValueObject = await this.operationPayloadPermissionsValueObject({
      collection: findSubDocumentRequestValueObject.getCollection(),
      id: null,
      subCollection: findSubDocumentRequestValueObject.getSubCollection(),
      parentId: findSubDocumentRequestValueObject.getParentId(),
      operationType: 'find_subdocument',
      payload: findSubDocumentRequestValueObject.getCriteria()
    })

    const hasPermission = await this.getOperationPermissionsService.execute({
      operationPayloadPermissionsValueObject
    })
    if (!hasPermission)
      throw new Error('FindSubDocumentService: insufficient permissions to perform this operation')

    const findResult = await this.subDocumentRepository.find(findSubDocumentRequestValueObject)

    if (findResult === null)
        throw new Error('FindSubDocumentService: error while finding documents')

    return findResult
  }
}

export { FindSubDocumentService }
