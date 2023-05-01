import { SharedController } from 'passager-backend-shared-kernel'
import { deleteSubDocumentUseCase } from '../../application/useCases/factory'

class DeleteSubDocumentController extends SharedController {

  public async safeInternalExecute (collection: string, parentId: string, subCollection: string, id: string): Promise<any> {

    const useCase = deleteSubDocumentUseCase()
    const documentDeletionResult = await useCase.execute({
      collection,
      currentUserId: 'SYSTEM',
      parentId,
      subCollection,
      id
    })

    return documentDeletionResult
  }

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
