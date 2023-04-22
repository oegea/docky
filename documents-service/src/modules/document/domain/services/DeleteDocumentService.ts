import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { GetDocumentService } from './GetDocumentService'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'
import { OperationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/OperationPayloadPermissionsValueObject'

class DeleteDocumentService {
  private readonly documentRepository: DocumentRepository
  private readonly getDocumentService: GetDocumentService
  private readonly getOperationPermissionsService: GetOperationPermissionsService
  private readonly operationPayloadPermissionsValueObject: ({ collection, id, subCollection, parentId, operationType, payload }: { collection: string; id: string; subCollection: string; parentId: string; operationType: string; payload: any; }) => Promise<OperationPayloadPermissionsValueObject>

  constructor ({
    documentRepository,
    getDocumentService,
    getOperationPermissionsService,
    operationPayloadPermissionsValueObject
  }: {
    documentRepository: DocumentRepository,
    getDocumentService: GetDocumentService,
    getOperationPermissionsService: GetOperationPermissionsService,
    operationPayloadPermissionsValueObject: ({ collection, id, subCollection, parentId, operationType, payload }: { collection: string; id: string; subCollection: string; parentId: string; operationType: string; payload: any; }) => Promise<OperationPayloadPermissionsValueObject>
  }) {
    this.documentRepository = documentRepository
    this.getDocumentService = getDocumentService
    this.getOperationPermissionsService = getOperationPermissionsService
    this.operationPayloadPermissionsValueObject = operationPayloadPermissionsValueObject
  }

  public async execute ({
    documentEntity
  }: {
    documentEntity: DocumentEntity
  }): Promise<Boolean> {

    const operationPayloadPermissionsValueObject = await this.operationPayloadPermissionsValueObject({
      collection: documentEntity.getCollection(),
      id: documentEntity.getId(),
      subCollection: null,
      parentId: null,
      operationType: 'delete_document',
      payload: documentEntity.toJson()
    })

    const hasPermission = await this.getOperationPermissionsService.execute({
      operationPayloadPermissionsValueObject
    })
    if (!hasPermission)
      throw new Error('DeleteDocumentService: insufficient permissions to perform this operation')

    try {
      await this.getDocumentService.execute({documentEntity})
    }
    catch(e){
      return false
    }

    const deleteResult = await this.documentRepository.delete(documentEntity)

    return deleteResult
  }
}

export { DeleteDocumentService }
