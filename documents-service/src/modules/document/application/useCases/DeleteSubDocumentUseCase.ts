import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { DeleteSubDocumentService } from '../../domain/services/DeleteSubDocumentService'
import {
  userIdValueObject
} from '@useful-tools/docky-shared-kernel'

class DeleteSubDocumentUseCase {
  private readonly subDocumentEntity: ({ collection, documentPlainObject, id, parentId, subCollection }: { collection: string, documentPlainObject: object, id: string, parentId: string, subCollection: string }) => Promise<SubDocumentEntity>
  private readonly deleteSubDocumentService: DeleteSubDocumentService

  constructor ({
    subDocumentEntity,
    deleteSubDocumentService
  }: {
    subDocumentEntity: ({ collection, documentPlainObject, id, parentId, subCollection }: { collection: string, documentPlainObject: object, id: string, parentId: string, subCollection: string }) => Promise<SubDocumentEntity>
    deleteSubDocumentService: DeleteSubDocumentService
  }) {
    this.subDocumentEntity = subDocumentEntity
    this.deleteSubDocumentService = deleteSubDocumentService
  }

  public async execute ({
    collection,
    currentUserId,
    parentId,
    subCollection,
    id
  }: {
    collection: string
    currentUserId: string
    parentId: string
    subCollection: string
    id: string
  }): Promise<Boolean> {
    try {
      const currentUserIdValueObject = await userIdValueObject({
        userId: currentUserId
      })
      const subDocumentEntity = await this.subDocumentEntity({ collection, parentId, subCollection, id, documentPlainObject: {} })
      const deleteResult = await this.deleteSubDocumentService.execute({ currentUserIdValueObject, subDocumentEntity })
      return deleteResult
    } catch (e) {
      throw e.message
    }
  }
}

export { DeleteSubDocumentUseCase }
