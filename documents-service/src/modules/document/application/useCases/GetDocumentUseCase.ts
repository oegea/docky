import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { GetDocumentService } from '../../domain/services/GetDocumentService'
import { 
  userIdValueObject
} from 'passager-backend-shared-kernel'

class GetDocumentUseCase {
  private readonly documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
  private readonly getDocumentService: GetDocumentService

  constructor ({
    documentEntity,
    getDocumentService
  }: {
    documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
    getDocumentService: GetDocumentService
  }) {
    this.documentEntity = documentEntity
    this.getDocumentService = getDocumentService
  }

  public async execute ({ 
    collection,
    currentUserId, 
    id 
  }: {
    collection: string, 
    currentUserId: string,
    id: string
  }): Promise<object> {
    try {
      const currentUserIdValueObject = await userIdValueObject({
        userId: currentUserId
      })
      const documentEntity = await this.documentEntity({ collection, id, documentPlainObject: {} })
      const documentEntityResult =  await this.getDocumentService.execute({ currentUserIdValueObject, documentEntity })
      return documentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { GetDocumentUseCase }
