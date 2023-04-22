import { SubDocumentEntity } from '../entities/SubDocumentEntity'
import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'
import { OperationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/OperationPayloadPermissionsValueObject'

class PatchSubDocumentService {
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
    subDocumentEntity
  }: {
    subDocumentEntity: SubDocumentEntity
  }): Promise<SubDocumentEntity> {

    const operationPayloadPermissionsValueObject = await this.operationPayloadPermissionsValueObject({
      collection: subDocumentEntity.getCollection(),
      id: subDocumentEntity.getId(),
      subCollection: subDocumentEntity.getSubCollection(),
      parentId: subDocumentEntity.getParentId(),
      operationType: 'patch_subdocument',
      payload: subDocumentEntity.toJson()
    })

    const hasPermission = await this.getOperationPermissionsService.execute({
      operationPayloadPermissionsValueObject
    })
    if (!hasPermission)
      throw new Error('PatchSubDocumentService: insufficient permissions to perform this operation')

    const documentUpdateResult = await this.subDocumentRepository.patch(subDocumentEntity)

    if (documentUpdateResult === null)
        throw new Error('PatchSubDocumentService: error while patching a sub document')

    return documentUpdateResult
  }
}

export { PatchSubDocumentService }
