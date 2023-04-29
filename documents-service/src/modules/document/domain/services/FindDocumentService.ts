import { FindDocumentRequestValueObject } from '../valueObjects/FindDocumentRequestValueObject'
import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntityListValueObject } from '../../domain/valueObjects/DocumentEntityListValueObject'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'
import { OperationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/OperationPayloadPermissionsValueObject'
import { UserIdValueObject } from 'passager-backend-shared-kernel'

class FindDocumentService {
  private readonly documentRepository: DocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService
  private readonly operationPayloadPermissionsValueObject: ({ collection, currentUserIdValueObject, id, subCollection, parentId, operationType, payload }: { collection: string; currentUserIdValueObject: UserIdValueObject; id: string; subCollection: string; parentId: string; operationType: string; payload: any; }) => Promise<OperationPayloadPermissionsValueObject>

  constructor ({
    documentRepository,
    getOperationPermissionsService,
    operationPayloadPermissionsValueObject
  }: {
    documentRepository: DocumentRepository,
    getOperationPermissionsService: GetOperationPermissionsService,
    operationPayloadPermissionsValueObject: ({ collection, currentUserIdValueObject, id, subCollection, parentId, operationType, payload }: { collection: string; currentUserIdValueObject: UserIdValueObject; id: string; subCollection: string; parentId: string; operationType: string; payload: any; }) => Promise<OperationPayloadPermissionsValueObject>
  }) {
    this.documentRepository = documentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
    this.operationPayloadPermissionsValueObject = operationPayloadPermissionsValueObject
  }

  private async checkPermissions(findDocumentRequestValueObject: FindDocumentRequestValueObject, currentUserIdValueObject: UserIdValueObject) {
    const operationPayloadPermissionsValueObject = await this.operationPayloadPermissionsValueObject({
      collection: findDocumentRequestValueObject.getCollection(),
      currentUserIdValueObject,
      id: null,
      subCollection: null,
      parentId: null,
      operationType: 'find_document',
      payload: findDocumentRequestValueObject.getCriteria()
    })

    const hasPermission = await this.getOperationPermissionsService.execute({
      operationPayloadPermissionsValueObject
    })
    if (!hasPermission)
      throw new Error('FindDocumentService: insufficient permissions to perform this operation')
  }

  public async execute ({
    currentUserIdValueObject,
    findDocumentRequestValueObject
  }: {
    currentUserIdValueObject: UserIdValueObject,
    findDocumentRequestValueObject: FindDocumentRequestValueObject
  }): Promise<DocumentEntityListValueObject> {

    if (currentUserIdValueObject.getUserId() !== 'SYSTEM')
      await this.checkPermissions(findDocumentRequestValueObject, currentUserIdValueObject)

    const findResult = await this.documentRepository.find(findDocumentRequestValueObject)

    if (findResult === null)
        throw new Error('FindDocumentService: error while finding documents')

    return findResult
  }
}

export { FindDocumentService }
