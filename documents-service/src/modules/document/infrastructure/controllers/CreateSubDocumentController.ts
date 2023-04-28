import { SharedController } from 'passager-backend-shared-kernel'
import { createSubDocumentUseCase } from '../../application/useCases/factory'

class CreateSubDocumentController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { collection, parentId, subCollection } = this.req.params
    const documentPlainObject = this.req.body

    const useCase = createSubDocumentUseCase()
    const documentCreationResult = await useCase.execute({
      collection, 
      currentUserId: this.req.user.email,
      documentPlainObject, 
      parentId, 
      subCollection
    })

    this.success(documentCreationResult)
  }
}

export { CreateSubDocumentController }
