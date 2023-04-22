class OperationPayloadPermissionsValueObject {

    private readonly collection: string
    private readonly id: string
    private readonly subCollection: string
    private readonly parentId: string
    private readonly operationType: string
    private readonly payload: any

    constructor ({
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
    }) {
        this.collection = collection
        this.id = id
        this.subCollection = subCollection
        this.parentId = parentId
        this.operationType = operationType
        this.payload = payload
    }

    getCollection (): string {
        return this.collection
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
