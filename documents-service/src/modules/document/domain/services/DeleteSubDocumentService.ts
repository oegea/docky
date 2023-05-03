import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { GetSubDocumentService } from './GetSubDocumentService'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'
import { OperationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/OperationPayloadPermissionsValueObject'
import { UserIdValueObject } from 'passager-backend-shared-kernel'

class DeleteSubDocumentService {
  private readonly subDocumentRepository: SubDocumentRepository
  private readonly getSubDocumentService: GetSubDocumentService
  private readonly getOperationPermissionsService: GetOperationPermissionsService
  private readonly operationPayloadPermissionsValueObject: ({ collection, currentUserIdValueObject, id, subCollection, parentId, operationType, payload }: { collection: string, currentUserIdValueObject: UserIdValueObject, id: string, subCollection: string, parentId: string, operationType: string, payload: any }) => Promise<OperationPayloadPermissionsValueObject>

  constructor ({
    subDocumentRepository,
    getSubDocumentService,
    getOperationPermissionsService,
    operationPayloadPermissionsValueObject
  }: {
    subDocumentRepository: SubDocumentRepository
    getSubDocumentService: GetSubDocumentService
    getOperationPermissionsService: GetOperationPermissionsService
    operationPayloadPermissionsValueObject: ({ collection, currentUserIdValueObject, id, subCollection, parentId, operationType, payload }: { collection: string, currentUserIdValueObject: UserIdValueObject, id: string, subCollection: string, parentId: string, operationType: string, payload: any }) => Promise<OperationPayloadPermissionsValueObject>
  }) {
    this.subDocumentRepository = subDocumentRepository
    this.getSubDocumentService = getSubDocumentService
    this.getOperationPermissionsService = getOperationPermissionsService
    this.operationPayloadPermissionsValueObject = operationPayloadPermissionsValueObject
  }

  public async execute ({
    currentUserIdValueObject,
    subDocumentEntity
  }: {
    currentUserIdValueObject: UserIdValueObject
    subDocumentEntity: SubDocumentEntity
  }): Promise<Boolean> {
    const operationPayloadPermissionsValueObject = await this.operationPayloadPermissionsValueObject({
      collection: subDocumentEntity.getCollection(),
      currentUserIdValueObject,
      id: subDocumentEntity.getId(),
      subCollection: subDocumentEntity.getSubCollection(),
      parentId: subDocumentEntity.getParentId(),
      operationType: 'delete_subdocument',
      payload: subDocumentEntity.toJson()
    })

    const hasPermission = await this.getOperationPermissionsService.execute({
      operationPayloadPermissionsValueObject
    })
    if (!hasPermission) { throw new Error('DeleteSubDocumentService: insufficient permissions to perform this operation') }

    try {
      await this.getSubDocumentService.execute({ currentUserIdValueObject, subDocumentEntity })
    } catch (e) {
      return false
    }

    const deleteResult = await this.subDocumentRepository.delete(subDocumentEntity)

    return deleteResult
  }
}

export { DeleteSubDocumentService }
