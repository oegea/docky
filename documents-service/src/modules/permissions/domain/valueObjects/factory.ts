import { OperationPayloadPermissionsValueObject } from './OperationPayloadPermissionsValueObject'
import { UserIdValueObject } from '@useful-tools/docky-shared-kernel'

const operationPayloadPermissionsValueObject = async ({
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
}): Promise<OperationPayloadPermissionsValueObject> => {
  const operationPayloadPermissionsValueObject = new OperationPayloadPermissionsValueObject({
    collection,
    currentUserIdValueObject,
    id,
    subCollection,
    parentId,
    operationType,
    payload
  })

  return operationPayloadPermissionsValueObject
}

export { operationPayloadPermissionsValueObject }
