import { DocumentEntity } from '../../domain/entities/DocumentEntity'
import { DeleteDocumentService } from '../../domain/services/DeleteDocumentService'

class DeleteDocumentUseCase {
  private readonly documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
  private readonly deleteDocumentService: DeleteDocumentService

  constructor ({
    documentEntity,
    deleteDocumentService
  }: {
    documentEntity: ({id, collection, documentPlainObject}: {id: string, collection: string, documentPlainObject: object}) => Promise<DocumentEntity>
    deleteDocumentService: DeleteDocumentService
  }) {
    this.documentEntity = documentEntity
    this.deleteDocumentService = deleteDocumentService
  }

  public async execute ({ collection, id }: {collection: string, id: string}): Promise<Boolean> {
    try {
      const documentEntity = await this.documentEntity({ collection, id, documentPlainObject: {} })
      const deleteResult =  await this.deleteDocumentService.execute({ documentEntity })
      return deleteResult
    } catch (e) {
      throw e.message
    }
  }
}

export { DeleteDocumentUseCase }
