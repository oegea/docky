import {
  EventBusRepository
} from '@useful-tools/docky-shared-kernel'
import { OperationPayloadPermissionsValueObject } from '../valueObjects/OperationPayloadPermissionsValueObject'

class GetOperationPermissionsService {
  private readonly eventBusRepository: EventBusRepository

  constructor ({
    eventBusRepository
  }: {
    eventBusRepository: EventBusRepository
  }) {
    this.eventBusRepository = eventBusRepository
  }

  public async execute ({ operationPayloadPermissionsValueObject }: {operationPayloadPermissionsValueObject: OperationPayloadPermissionsValueObject}): Promise<Boolean> {
    const collection = operationPayloadPermissionsValueObject.getCollection()
    const currentUserId = operationPayloadPermissionsValueObject
      .getCurrentUserIdValueObject()
      .getUserId()
    const id = operationPayloadPermissionsValueObject.getId()
    const subCollection = operationPayloadPermissionsValueObject.getSubCollection()
    const parentId = operationPayloadPermissionsValueObject.getParentId()
    const operationType = operationPayloadPermissionsValueObject.getOperationType()
    const payload = operationPayloadPermissionsValueObject.getPayload()

    if (currentUserId === 'SYSTEM') { return true }

    const hasPermissions = await this.eventBusRepository.query(
      'GET_OPERATION_PERMISSIONS', {
        collection,
        currentUserId,
        id,
        subCollection,
        parentId,
        operationType,
        payload
      }
    )

    if (hasPermissions === null) { return false }

    return hasPermissions[0]
  }
}

export { GetOperationPermissionsService }
