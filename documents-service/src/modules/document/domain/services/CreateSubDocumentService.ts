import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { DocumentEntity } from '../entities/DocumentEntity'
import { SubDocumentEntity } from '../entities/SubDocumentEntity'
import { GetDocumentService } from './GetDocumentService'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'


class CreateSubDocumentService {
  private readonly documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
  private readonly getDocumentService: GetDocumentService
  private readonly subDocumentRepository: SubDocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService

  constructor ({
    documentEntity,
    getDocumentService,
    subDocumentRepository,
    getOperationPermissionsService
  }: {
    documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
    getDocumentService: GetDocumentService,
    subDocumentRepository: SubDocumentRepository,
    getOperationPermissionsService: GetOperationPermissionsService
  }) {
    this.documentEntity = documentEntity
    this.getDocumentService = getDocumentService
    this.subDocumentRepository = subDocumentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
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

    const hasPermission = await this.getOperationPermissionsService.execute()
    if (!hasPermission)
      throw new Error('CreateSubDocumentService: insufficient permissions to perform this operation')

    const subDocumentCreationResult = await this.subDocumentRepository.create(subDocumentEntity)

    if (subDocumentCreationResult === null)
        throw new Error('CreateSubDocumentService: error while creating a new subdocument')

    return subDocumentCreationResult
  }
}

export { CreateSubDocumentService }
