import { SharedController } from 'passager-backend-shared-kernel'
import { deleteDocumentUseCase } from '../../application/useCases/factory'

class DeleteDocumentController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { collection, id } = this.req.params

    const useCase = deleteDocumentUseCase()
    const documentDeletionResult = await useCase.execute({ collection, id })

    this.success(documentDeletionResult)
  }
}

export { DeleteDocumentController }
