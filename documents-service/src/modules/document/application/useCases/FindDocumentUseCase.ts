import { FindDocumentRequestValueObject } from '../../domain/valueObjects/FindDocumentRequestValueObject'
import { FindDocumentService } from '../../domain/services/FindDocumentService'
import { 
  userIdValueObject
} from 'passager-backend-shared-kernel'

class FindDocumentUseCase {
  private readonly findDocumentRequestValueObject: ({ collection, criteria }: {collection: string, criteria: object}) => Promise<FindDocumentRequestValueObject>
  private readonly findDocumentService: FindDocumentService

  constructor ({
    findDocumentRequestValueObject,
    findDocumentService
  }: {
    findDocumentRequestValueObject: ({ collection, criteria }: {collection: string, criteria: object}) => Promise<FindDocumentRequestValueObject>
    findDocumentService: FindDocumentService
  }) {
    this.findDocumentRequestValueObject = findDocumentRequestValueObject
    this.findDocumentService = findDocumentService
  }

  public async execute ({ 
    collection,
    currentUserId, 
    criteria 
  }: {
    collection: string, 
    currentUserId: string,
    criteria: object
  }): Promise<object> {
    try {
      const currentUserIdValueObject = await userIdValueObject({
        userId: currentUserId
      })
      const findDocumentRequestValueObject = await this.findDocumentRequestValueObject({ collection, criteria })
      const documentEntityResult =  await this.findDocumentService.execute({ currentUserIdValueObject, findDocumentRequestValueObject })
      return documentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { FindDocumentUseCase }
