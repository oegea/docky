import { GetDocumentRequestValueObject } from '../../domain/valueObjects/GetDocumentRequestValueObject'
import { GetDocumentService } from '../../domain/services/GetDocumentService'

class GetDocumentUseCase {
  private readonly getDocumentRequestValueObject: ({ collection, id }: {collection: string, id: string}) => Promise<GetDocumentRequestValueObject>
  private readonly getDocumentService: GetDocumentService

  constructor ({
    getDocumentRequestValueObject,
    getDocumentService
  }: {
    getDocumentRequestValueObject: ({ collection, id }: {collection: string, id: string}) => Promise<GetDocumentRequestValueObject>
    getDocumentService: GetDocumentService
  }) {
    this.getDocumentRequestValueObject = getDocumentRequestValueObject
    this.getDocumentService = getDocumentService
  }

  public async execute ({ collection, id }: {collection: string, id: string}): Promise<object> {
    try {
      const getDocumentRequestValueObject = await this.getDocumentRequestValueObject({ collection, id })
      const documentEntityResult =  await this.getDocumentService.execute({ getDocumentRequestValueObject })
      return documentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { GetDocumentUseCase }
