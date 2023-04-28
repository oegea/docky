import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { PatchSubDocumentService } from '../../domain/services/PatchSubDocumentService'
import { 
  userIdValueObject
} from 'passager-backend-shared-kernel'

class PatchSubDocumentUseCase {

  private readonly subDocumentEntity: ({ collection, documentPlainObject, id, parentId, subCollection }: { collection: string, documentPlainObject: object, id: string, parentId: string, subCollection: string }) => Promise<SubDocumentEntity>
  private readonly patchSubDocumentService: PatchSubDocumentService

  constructor ({
    subDocumentEntity,
    patchSubDocumentService
  }: {
    subDocumentEntity: ({ collection, documentPlainObject, id, parentId, subCollection }: { collection: string, documentPlainObject: object, id: string, parentId: string, subCollection: string }) => Promise<SubDocumentEntity>
    patchSubDocumentService: PatchSubDocumentService
  }) {
    this.subDocumentEntity = subDocumentEntity
    this.patchSubDocumentService = patchSubDocumentService
  }

  public async execute ({ 
    collection, 
    currentUserId,
    parentId, 
    subCollection, 
    id, 
    document
  }: {
    collection: string, 
    currentUserId: string,
    parentId: string, 
    subCollection: string, 
    id: string, 
    document: object
  }): Promise<object> {
    try {
      const currentUserIdValueObject = await userIdValueObject({
        userId: currentUserId
      })
      const subDocumentEntity = await this.subDocumentEntity({
        id,
        collection,
        parentId,
        subCollection,
        documentPlainObject: document
      })
      const result =  await this.patchSubDocumentService.execute({ currentUserIdValueObject, subDocumentEntity })
      return result.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { PatchSubDocumentUseCase }
