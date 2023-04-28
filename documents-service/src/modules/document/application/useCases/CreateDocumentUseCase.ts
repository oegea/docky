import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { CreateDocumentService } from '../../domain/services/CreateDocumentService'
import { 
  userIdValueObject
} from 'passager-backend-shared-kernel'

class CreateDocumentUseCase {
  private readonly documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
  private readonly createDocumentService: CreateDocumentService

  constructor ({
    documentEntity,
    createDocumentService
  }: {
    documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
    createDocumentService: CreateDocumentService
  }) {
    this.documentEntity = documentEntity
    this.createDocumentService = createDocumentService
  }

  public async execute ({ 
    collection,
    currentUserId, 
    document 
  }: {
    collection: string, 
    currentUserId: string,
    document: object
  }): Promise<object> {
    try {
      const currentUserIdValueObject = await userIdValueObject({
        userId: currentUserId
      })
      const documentEntity = await this.documentEntity({ id: null, collection, documentPlainObject: document })
      const documentEntityResult =  await this.createDocumentService.execute({ currentUserIdValueObject, documentEntity })
      return documentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { CreateDocumentUseCase }
