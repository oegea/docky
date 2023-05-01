import { SharedController } from 'passager-backend-shared-kernel'
import { deleteDocumentUseCase } from '../../application/useCases/factory'

class DeleteDocumentController extends SharedController {

  public async safeInternalExecute (collection: string, id: string): Promise<any> {
    const useCase = deleteDocumentUseCase()
    const documentDeletionResult = await useCase.execute({
      collection,
      currentUserId: 'SYSTEM',
      id
    })

    return documentDeletionResult
  }

  public async safeExecute (): Promise<void> {
    const { collection, id } = this.req.params

    const useCase = deleteDocumentUseCase()
    const documentDeletionResult = await useCase.execute({ 
      collection,
      currentUserId: this.req.user.email, 
      id 
    })

    this.success(documentDeletionResult)
  }
}

export { DeleteDocumentController }
