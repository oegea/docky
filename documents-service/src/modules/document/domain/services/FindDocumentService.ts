import { FindDocumentRequestValueObject } from '../valueObjects/FindDocumentRequestValueObject'
import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntityListValueObject } from '../../domain/valueObjects/DocumentEntityListValueObject'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'
import { OperationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/OperationPayloadPermissionsValueObject'

class FindDocumentService {
  private readonly documentRepository: DocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService
  private readonly operationPayloadPermissionsValueObject: ({ collection, id, subCollection, parentId, operationType, payload }: { collection: string; id: string; subCollection: string; parentId: string; operationType: string; payload: any; }) => Promise<OperationPayloadPermissionsValueObject>

  constructor ({
    documentRepository,
    getOperationPermissionsService,
    operationPayloadPermissionsValueObject
  }: {
    documentRepository: DocumentRepository,
    getOperationPermissionsService: GetOperationPermissionsService,
    operationPayloadPermissionsValueObject: ({ collection, id, subCollection, parentId, operationType, payload }: { collection: string; id: string; subCollection: string; parentId: string; operationType: string; payload: any; }) => Promise<OperationPayloadPermissionsValueObject>
  }) {
    this.documentRepository = documentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
    this.operationPayloadPermissionsValueObject = operationPayloadPermissionsValueObject
  }

  public async execute ({
    findDocumentRequestValueObject
  }: {
    findDocumentRequestValueObject: FindDocumentRequestValueObject
  }): Promise<DocumentEntityListValueObject> {

    const operationPayloadPermissionsValueObject = await this.operationPayloadPermissionsValueObject({
      collection: findDocumentRequestValueObject.getCollection(),
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

    const findResult = await this.documentRepository.find(findDocumentRequestValueObject)

    if (findResult === null)
        throw new Error('FindDocumentService: error while finding documents')

    return findResult
  }
}

export { FindDocumentService }
