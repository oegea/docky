import { SharedController } from 'passager-backend-shared-kernel'
import { patchDocumentUseCase } from '../../application/useCases/factory'

class PatchDocumentController extends SharedController {

  public async safeInternalExecute (collection: string, id: string, document: any): Promise<any> {
    const useCase = patchDocumentUseCase()
    const documentPatchResult = await useCase.execute({
      collection,
      currentUserId: 'SYSTEM',
      id,
      document
    })

    return documentPatchResult
  }

  public async safeExecute (): Promise<void> {
    const { collection, id } = this.req.params
    const document = this.req.body

    const useCase = patchDocumentUseCase()
    const documentPatchResult = await useCase.execute({ 
      collection,
      currentUserId: this.req.user.email, 
      id, 
      document 
    })

    this.success(documentPatchResult)
  }
}

export { PatchDocumentController }
