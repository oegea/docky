import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { CreateSubDocumentService } from '../../domain/services/CreateSubDocumentService'
import {
  userIdValueObject
} from '@useful-tools/docky-shared-kernel'

class CreateSubDocumentUseCase {
  private readonly subDocumentEntity: ({ collection, documentPlainObject, id, parentId, subCollection }: { collection: string, documentPlainObject: object, id: string, parentId: string, subCollection: string }) => Promise<SubDocumentEntity>
  private readonly createSubDocumentService: CreateSubDocumentService

  constructor ({
    subDocumentEntity,
    createSubDocumentService
  }: {
    subDocumentEntity: ({ collection, documentPlainObject, id, parentId, subCollection }: { collection: string, documentPlainObject: object, id: string, parentId: string, subCollection: string }) => Promise<SubDocumentEntity>
    createSubDocumentService: CreateSubDocumentService
  }) {
    this.subDocumentEntity = subDocumentEntity
    this.createSubDocumentService = createSubDocumentService
  }

  public async execute ({
    collection,
    currentUserId,
    documentPlainObject,
    parentId,
    subCollection
  }: {
    collection: string
    currentUserId: string
    documentPlainObject: object
    parentId: string
    subCollection: string
  }): Promise<object> {
    try {
      const currentUserIdValueObject = await userIdValueObject({
        userId: currentUserId
      })
      const subDocumentEntity = await this.subDocumentEntity({
        collection,
        documentPlainObject,
        id: null,
        parentId,
        subCollection
      })
      const documentEntityResult = await this.createSubDocumentService.execute({ currentUserIdValueObject, subDocumentEntity })
      return documentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { CreateSubDocumentUseCase }
