import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { CreateDocumentService } from '../../domain/services/CreateDocumentService'

class CreateDocumentUseCase {
  private readonly documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
  private readonly createDocumentService: CreateDocumentService

  constructor ({
    documentEntity,
    createDocumentService
  }: {
    documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
    createDocumentService: CreateDocumentService
  }) {
    this.documentEntity = documentEntity
    this.createDocumentService = createDocumentService
  }

  public async execute ({ collection, document }: {collection: string, document: object}): Promise<object> {
    try {
      const documentEntity = await this.documentEntity({ id: null, collection, documentPlainObject: document })
      const documentEntityResult =  await this.createDocumentService.execute({ documentEntity })
      return documentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { CreateDocumentUseCase }
