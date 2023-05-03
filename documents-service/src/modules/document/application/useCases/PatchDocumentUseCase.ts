import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { PatchDocumentService } from '../../domain/services/PatchDocumentService'
import {
  userIdValueObject
} from 'passager-backend-shared-kernel'

class PatchDocumentUseCase {
  private readonly documentEntity: ({ id, collection, documentPlainObject }: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
  private readonly patchDocumentService: PatchDocumentService

  constructor ({
    documentEntity,
    patchDocumentService
  }: {
    documentEntity: ({ id, collection, documentPlainObject }: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
    patchDocumentService: PatchDocumentService
  }) {
    this.documentEntity = documentEntity
    this.patchDocumentService = patchDocumentService
  }

  public async execute ({
    collection,
    currentUserId,
    id,
    document
  }: {
    collection: string
    currentUserId: string
    id: string
    document: object
  }): Promise<object> {
    try {
      const currentUserIdValueObject = await userIdValueObject({
        userId: currentUserId
      })
      const documentEntity = await this.documentEntity({
        id,
        collection,
        documentPlainObject: document
      })
      const result = await this.patchDocumentService.execute({ currentUserIdValueObject, documentEntity })
      return result.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { PatchDocumentUseCase }
