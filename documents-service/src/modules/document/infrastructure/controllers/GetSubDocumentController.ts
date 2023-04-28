import { SharedController } from 'passager-backend-shared-kernel'
import { getSubDocumentUseCase } from '../../application/useCases/factory'

class GetSubDocumentController extends SharedController {
  public async safeExecute (): Promise<void> {
    // :collection/:parentId/:subcollection/:id
    const { collection, parentId, subCollection, id } = this.req.params

    const useCase = getSubDocumentUseCase()
    const getDocumentResult = await useCase.execute({ 
      collection,
      currentUserId: this.req.user.email, 
      parentId, 
      subCollection, 
      id 
    })

    this.success(getDocumentResult)
  }
}

export { GetSubDocumentController }
