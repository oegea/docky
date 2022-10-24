import { CreateDocumentRequestValueObject } from '../../domain/valueObjects/CreateDocumentRequestValueObject'
import { CreateDocumentService } from '../../domain/services/CreateDocumentService'

class CreateDocumentUseCase {
  private readonly createDocumentRequestValueObject: ({ collection, document }: {collection: string, document: object}) => Promise<CreateDocumentRequestValueObject>
  private readonly createDocumentService: CreateDocumentService

  constructor ({
    createDocumentRequestValueObject,
    createDocumentService
  }: {
    createDocumentRequestValueObject: ({ collection, document }: {collection: string, document: object}) => Promise<CreateDocumentRequestValueObject>
    createDocumentService: CreateDocumentService
  }) {
    this.createDocumentRequestValueObject = createDocumentRequestValueObject
    this.createDocumentService = createDocumentService
  }

  public async execute ({ collection, document }: {collection: string, document: object}): Promise<object> {
    try {
      const createDocumentRequestValueObject = await this.createDocumentRequestValueObject({ collection, document })
      const documentEntityResult =  await this.createDocumentService.execute({ createDocumentRequestValueObject })
      return documentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { CreateDocumentUseCase }
