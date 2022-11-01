import { FindDocumentRequestValueObject } from '../../domain/valueObjects/FindDocumentRequestValueObject'
import { FindDocumentService } from '../../domain/services/FindDocumentService'

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

  public async execute ({ collection, criteria }: {collection: string, criteria: object}): Promise<object> {
    try {
      const findDocumentRequestValueObject = await this.findDocumentRequestValueObject({ collection, criteria })
      const documentEntityResult =  await this.findDocumentService.execute({ findDocumentRequestValueObject })
      return documentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { FindDocumentUseCase }
