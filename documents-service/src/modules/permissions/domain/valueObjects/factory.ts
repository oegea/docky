import { OperationPayloadPermissionsValueObject } from './OperationPayloadPermissionsValueObject'


const operationPayloadPermissionsValueObject = async({
    collection,
    id,
    subCollection,
    parentId,
    operationType,
    payload
}: {
    collection: string,
    id: string,
    subCollection: string,
    parentId: string,
    operationType: string,
    payload: any
}): Promise<OperationPayloadPermissionsValueObject> => {
    const operationPayloadPermissionsValueObject = new OperationPayloadPermissionsValueObject({
        collection,
        id,
        subCollection,
        parentId,
        operationType,
        payload
    })

    return operationPayloadPermissionsValueObject
}

export { operationPayloadPermissionsValueObject }
