import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { GetSubDocumentService } from '../../domain/services/GetSubDocumentService'
import { 
  userIdValueObject
} from 'passager-backend-shared-kernel'

class GetSubDocumentUseCase {
  private readonly subDocumentEntity: ({ collection, documentPlainObject, id, parentId, subCollection }: { collection: string, documentPlainObject: object, id: string, parentId: string, subCollection: string }) => Promise<SubDocumentEntity>
  private readonly getSubDocumentService: GetSubDocumentService

  constructor ({
    subDocumentEntity,
    getSubDocumentService
  }: {
    subDocumentEntity: ({ collection, documentPlainObject, id, parentId, subCollection }: { collection: string, documentPlainObject: object, id: string, parentId: string, subCollection: string }) => Promise<SubDocumentEntity>
    getSubDocumentService: GetSubDocumentService
  }) {
    this.subDocumentEntity = subDocumentEntity
    this.getSubDocumentService = getSubDocumentService
  }

  public async execute ({ 
    collection,
    currentUserId, 
    parentId, 
    subCollection, 
    id 
  }: {
    collection: string, 
    currentUserId: string,
    parentId: string, 
    subCollection: string, 
    id: string
  }): Promise<object> {
    try {
      const currentUserIdValueObject = await userIdValueObject({
        userId: currentUserId
      })
      const subDocumentEntity = await this.subDocumentEntity({collection, parentId, subCollection, id, documentPlainObject: {}})
      const documentEntityResult =  await this.getSubDocumentService.execute({ currentUserIdValueObject, subDocumentEntity })
      return documentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { GetSubDocumentUseCase }
