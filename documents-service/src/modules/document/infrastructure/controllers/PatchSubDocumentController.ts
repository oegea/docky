/*import { SharedController } from 'passager-backend-shared-kernel'
import { patchSubDocumentUseCase } from '../../application/useCases/factory'

class PatchSubDocumentController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { collection, parentId, subCollection, id } = this.req.params
    const document = this.req.body

    const useCase = patchSubDocumentUseCase()
    const documentPatchResult = await useCase.execute({ collection, parentId, subCollection, id, document })

    this.success(documentPatchResult)
  }
}

export { PatchSubDocumentController }*/
