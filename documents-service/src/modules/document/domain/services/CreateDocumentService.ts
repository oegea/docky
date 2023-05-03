import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'
import { OperationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/OperationPayloadPermissionsValueObject'
import { UserIdValueObject } from 'passager-backend-shared-kernel'

class CreateDocumentService {
  private readonly documentRepository: DocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService
  private readonly operationPayloadPermissionsValueObject: ({ collection, currentUserIdValueObject, id, subCollection, parentId, operationType, payload }: { collection: string, currentUserIdValueObject: UserIdValueObject, id: string, subCollection: string, parentId: string, operationType: string, payload: any }) => Promise<OperationPayloadPermissionsValueObject>
  constructor ({
    documentRepository,
    getOperationPermissionsService,
    operationPayloadPermissionsValueObject
  }: {
    documentRepository: DocumentRepository
    getOperationPermissionsService: GetOperationPermissionsService
    operationPayloadPermissionsValueObject: ({ collection, currentUserIdValueObject, id, subCollection, parentId, operationType, payload }: { collection: string, currentUserIdValueObject: UserIdValueObject, id: string, subCollection: string, parentId: string, operationType: string, payload: any }) => Promise<OperationPayloadPermissionsValueObject>
  }) {
    this.documentRepository = documentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
    this.operationPayloadPermissionsValueObject = operationPayloadPermissionsValueObject
  }

  public async execute ({
    currentUserIdValueObject,
    documentEntity
  }: {
    currentUserIdValueObject: UserIdValueObject
    documentEntity: DocumentEntity
  }): Promise<DocumentEntity> {
    const operationPayloadPermissionsValueObject = await this.operationPayloadPermissionsValueObject({
      collection: documentEntity.getCollection(),
      currentUserIdValueObject,
      id: documentEntity.getId(),
      subCollection: null,
      parentId: null,
      operationType: 'create_document',
      payload: documentEntity.toJson()
    })

    const hasPermission = await this.getOperationPermissionsService.execute({
      operationPayloadPermissionsValueObject
    })
    if (!hasPermission) { throw new Error('CreateDocumentService: insufficient permissions to perform this operation') }

    const documentCreationResult = await this.documentRepository.create(documentEntity)

    if (documentCreationResult === null) { throw new Error('CreateDocumentService: error while creating a new document') }

    return documentCreationResult
  }
}

export { CreateDocumentService }
