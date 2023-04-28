import { SharedController } from 'passager-backend-shared-kernel'
import { deleteSubDocumentUseCase } from '../../application/useCases/factory'

class DeleteSubDocumentController extends SharedController {
  public async safeExecute (): Promise<void> {
    // :collection/:parentId/:subCollection/:id
    const { collection, parentId, subCollection, id } = this.req.params

    const useCase = deleteSubDocumentUseCase()
    const documentDeletionResult = await useCase.execute({ 
      collection,
      currentUserId: this.req.user.email, 
      parentId, 
      subCollection, 
      id 
    })

    this.success(documentDeletionResult)
  }
}

export { DeleteSubDocumentController }
