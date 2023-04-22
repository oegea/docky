import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { DocumentEntity } from '../entities/DocumentEntity'
import { SubDocumentEntity } from '../entities/SubDocumentEntity'
import { GetDocumentService } from './GetDocumentService'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'
import { OperationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/OperationPayloadPermissionsValueObject'

class CreateSubDocumentService {
  private readonly documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
  private readonly getDocumentService: GetDocumentService
  private readonly subDocumentRepository: SubDocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService
  private readonly operationPayloadPermissionsValueObject: ({ collection, id, subCollection, parentId, operationType, payload }: { collection: string; id: string; subCollection: string; parentId: string; operationType: string; payload: any; }) => Promise<OperationPayloadPermissionsValueObject>

  constructor ({
    documentEntity,
    getDocumentService,
    subDocumentRepository,
    getOperationPermissionsService,
    operationPayloadPermissionsValueObject
  }: {
    documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
    getDocumentService: GetDocumentService,
    subDocumentRepository: SubDocumentRepository,
    getOperationPermissionsService: GetOperationPermissionsService,
    operationPayloadPermissionsValueObject: ({ collection, id, subCollection, parentId, operationType, payload }: { collection: string; id: string; subCollection: string; parentId: string; operationType: string; payload: any; }) => Promise<OperationPayloadPermissionsValueObject>
  }) {
    this.documentEntity = documentEntity
    this.getDocumentService = getDocumentService
    this.subDocumentRepository = subDocumentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
    this.operationPayloadPermissionsValueObject = operationPayloadPermissionsValueObject
  }

  private async parentDocumentExists({subDocumentEntity}: {subDocumentEntity: SubDocumentEntity}) {
    try {
      const parentId = subDocumentEntity.getParentId()
      const collection = subDocumentEntity.getCollection()
      const parentDocumentEntity = await this.documentEntity({id: parentId, collection, documentPlainObject: null})
      await this.getDocumentService.execute({documentEntity: parentDocumentEntity})
      return true
    } catch(exception) {
      console.log(exception)
      return false
    }

  }

  public async execute ({
    subDocumentEntity
  }: {
    subDocumentEntity: SubDocumentEntity
  }): Promise<SubDocumentEntity> {

    if (await this.parentDocumentExists({subDocumentEntity}) === false) 
      throw new Error('CreateSubDocumentService: parent document is not accessible')

    const operationPayloadPermissionsValueObject = await this.operationPayloadPermissionsValueObject({
      collection: subDocumentEntity.getCollection(),
      id: subDocumentEntity.getId(),
      subCollection: subDocumentEntity.getSubCollection(),
      parentId: subDocumentEntity.getParentId(),
      operationType: 'create_subdocument',
      payload: subDocumentEntity.toJson()
    })
    const hasPermission = await this.getOperationPermissionsService.execute({
      operationPayloadPermissionsValueObject
    })
    if (!hasPermission)
      throw new Error('CreateSubDocumentService: insufficient permissions to perform this operation')

    const subDocumentCreationResult = await this.subDocumentRepository.create(subDocumentEntity)

    if (subDocumentCreationResult === null)
        throw new Error('CreateSubDocumentService: error while creating a new subdocument')

    return subDocumentCreationResult
  }
}

export { CreateSubDocumentService }
