import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'
import { OperationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/OperationPayloadPermissionsValueObject'
import { EventBusRepository, UserIdValueObject } from 'passager-backend-shared-kernel'

class DeleteSubDocumentService {
  private readonly subDocumentRepository: SubDocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService
  private readonly operationPayloadPermissionsValueObject: ({ collection, currentUserIdValueObject, id, subCollection, parentId, operationType, payload }: { collection: string, currentUserIdValueObject: UserIdValueObject, id: string, subCollection: string, parentId: string, operationType: string, payload: any }) => Promise<OperationPayloadPermissionsValueObject>
  private readonly eventBusRepository: EventBusRepository

  constructor ({
    eventBusRepository,
    subDocumentRepository,
    getOperationPermissionsService,
    operationPayloadPermissionsValueObject
  }: {
    eventBusRepository: EventBusRepository
    subDocumentRepository: SubDocumentRepository
    getOperationPermissionsService: GetOperationPermissionsService
    operationPayloadPermissionsValueObject: ({ collection, currentUserIdValueObject, id, subCollection, parentId, operationType, payload }: { collection: string, currentUserIdValueObject: UserIdValueObject, id: string, subCollection: string, parentId: string, operationType: string, payload: any }) => Promise<OperationPayloadPermissionsValueObject>
  }) {
    this.eventBusRepository = eventBusRepository
    this.subDocumentRepository = subDocumentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
    this.operationPayloadPermissionsValueObject = operationPayloadPermissionsValueObject
  }

  private async subDocumentExists ({ subDocumentEntity }: {subDocumentEntity: SubDocumentEntity}) {
    try {
      const parentId = subDocumentEntity.getParentId()
      const collection = subDocumentEntity.getCollection()
      const subCollection = subDocumentEntity.getSubCollection()
      const id = subDocumentEntity.getId()

      const existingDocument = await this.eventBusRepository.query('GET_SUBDOCUMENT', {
        collection,
        id: id,
        subCollection,
        parentId
      })

      if (!Array.isArray(existingDocument)) { return false }

      if (existingDocument.length === 0) { return false }

      return true
    } catch (exception) {
      console.log(exception)
      return false
    }
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

    if (!await this.subDocumentExists({ subDocumentEntity })) { 
      return false
    }

    const deleteResult = await this.subDocumentRepository.delete(subDocumentEntity)

    return deleteResult
  }
}

export { DeleteSubDocumentService }
