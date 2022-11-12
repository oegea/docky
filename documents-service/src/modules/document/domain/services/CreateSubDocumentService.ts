import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { DocumentEntity } from '../entities/DocumentEntity'
import { SubDocumentEntity } from '../entities/SubDocumentEntity'
import { GetDocumentService } from './GetDocumentService'

class CreateSubDocumentService {
  private readonly documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
  private readonly getDocumentService: GetDocumentService
  private readonly subDocumentRepository: SubDocumentRepository

  constructor ({
    documentEntity,
    getDocumentService,
    subDocumentRepository
  }: {
    documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
    getDocumentService: GetDocumentService,
    subDocumentRepository: SubDocumentRepository
  }) {
    this.documentEntity = documentEntity
    this.getDocumentService = getDocumentService
    this.subDocumentRepository = subDocumentRepository
  }

  private async parentDocumentExists({subDocumentEntity}: {subDocumentEntity: SubDocumentEntity}) {
    try {
      const parentId = subDocumentEntity.getParentId()
      const collection = subDocumentEntity.getCollection()
      const parentDocumentEntity = await this.documentEntity({id: parentId, collection, documentPlainObject: null})
      await this.getDocumentService.execute({documentEntity: parentDocumentEntity})
      return true
    } catch(exception) {
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

    const subDocumentCreationResult = await this.subDocumentRepository.create(subDocumentEntity)

    if (subDocumentCreationResult === null)
        throw new Error('CreateSubDocumentService: error while creating a new subdocument')

    return subDocumentCreationResult
  }
}

export { CreateSubDocumentService }
