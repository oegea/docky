import { UserIdValueObject } from 'passager-backend-shared-kernel'

class OperationPayloadPermissionsValueObject {
  private readonly collection: string
  private readonly currentUserIdValueObject: UserIdValueObject
  private readonly id: string
  private readonly subCollection: string
  private readonly parentId: string
  private readonly operationType: string
  private readonly payload: any

  constructor ({
    collection,
    currentUserIdValueObject,
    id,
    subCollection,
    parentId,
    operationType,
    payload
  }: {
    collection: string
    currentUserIdValueObject: UserIdValueObject
    id: string
    subCollection: string
    parentId: string
    operationType: string
    payload: any
  }) {
    this.collection = collection
    this.currentUserIdValueObject = currentUserIdValueObject
    this.id = id
    this.subCollection = subCollection
    this.parentId = parentId
    this.operationType = operationType
    this.payload = payload
  }

  getCollection (): string {
    return this.collection
  }

  getCurrentUserIdValueObject (): UserIdValueObject {
    return this.currentUserIdValueObject
  }

  getId (): string {
    return this.id
  }

  getSubCollection (): string {
    return this.subCollection
  }

  getParentId (): string {
    return this.parentId
  }

  getOperationType (): string {
    return this.operationType
  }

  getPayload (): any {
    return this.payload
  }
}

export { OperationPayloadPermissionsValueObject }
