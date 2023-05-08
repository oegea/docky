import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { SubDocumentEntity } from '../entities/SubDocumentEntity'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'
import { OperationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/OperationPayloadPermissionsValueObject'
import { EventBusRepository, UserIdValueObject } from '@useful-tools/docky-shared-kernel'

class CreateSubDocumentService {
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

  private async parentDocumentExists ({ subDocumentEntity }: {subDocumentEntity: SubDocumentEntity}) {
    try {
      const parentId = subDocumentEntity.getParentId()
      const collection = subDocumentEntity.getCollection()

      const existingDocument = await this.eventBusRepository.query('GET_DOCUMENT', {
        collection,
        id: parentId
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
  }): Promise<SubDocumentEntity> {
    if (!await this.parentDocumentExists({ subDocumentEntity })) { throw new Error('CreateSubDocumentService: parent document is not accessible') }

    const operationPayloadPermissionsValueObject = await this.operationPayloadPermissionsValueObject({
      collection: subDocumentEntity.getCollection(),
      currentUserIdValueObject,
      id: subDocumentEntity.getId(),
      subCollection: subDocumentEntity.getSubCollection(),
      parentId: subDocumentEntity.getParentId(),
      operationType: 'create_subdocument',
      payload: subDocumentEntity.toJson()
    })
    const hasPermission = await this.getOperationPermissionsService.execute({
      operationPayloadPermissionsValueObject
    })
    if (!hasPermission) { throw new Error('CreateSubDocumentService: insufficient permissions to perform this operation') }

    const subDocumentCreationResult = await this.subDocumentRepository.create(subDocumentEntity)

    if (subDocumentCreationResult === null) { throw new Error('CreateSubDocumentService: error while creating a new subdocument') }

    return subDocumentCreationResult
  }
}

export { CreateSubDocumentService }
