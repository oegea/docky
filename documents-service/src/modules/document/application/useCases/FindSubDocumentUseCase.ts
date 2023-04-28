import { FindSubDocumentRequestValueObject } from '../../domain/valueObjects/FindSubDocumentRequestValueObject'
import { FindSubDocumentService } from '../../domain/services/FindSubDocumentService'
import { 
  userIdValueObject
} from 'passager-backend-shared-kernel'

class FindSubDocumentUseCase {
  private readonly findSubDocumentRequestValueObject: ({ 
        collection, 
        parentId,
        subCollection,
        criteria 
    }: {
        collection: string,
        parentId: string,
        subCollection: string,
        criteria: object
    }) => Promise<FindSubDocumentRequestValueObject>
  private readonly findSubDocumentService: FindSubDocumentService

  constructor ({
    findSubDocumentRequestValueObject,
    findSubDocumentService
  }: {
    findSubDocumentRequestValueObject: ({ 
        collection, 
        parentId,
        subCollection,
        criteria 
    }: {
        collection: string,
        parentId: string,
        subCollection: string,
        criteria: object
    }) => Promise<FindSubDocumentRequestValueObject>
    findSubDocumentService: FindSubDocumentService
  }) {
    this.findSubDocumentRequestValueObject = findSubDocumentRequestValueObject
    this.findSubDocumentService = findSubDocumentService
  }

  public async execute ({ 
    collection, 
    currentUserId,
    parentId,
    subCollection,
    criteria 
}: {
    collection: string,
    currentUserId: string,
    parentId: string,
    subCollection: string,
    criteria: object
}): Promise<object> {
    try {
      const currentUserIdValueObject = await userIdValueObject({
        userId: currentUserId
      })
      const findSubDocumentRequestValueObject = await this.findSubDocumentRequestValueObject({ 
        collection,
        parentId,
        subCollection,
        criteria 
      })
      const subDocumentEntityResult =  await this.findSubDocumentService.execute({ currentUserIdValueObject, findSubDocumentRequestValueObject })
      return subDocumentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { FindSubDocumentUseCase }
