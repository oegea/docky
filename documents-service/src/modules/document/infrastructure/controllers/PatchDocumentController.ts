import { SharedController } from 'passager-backend-shared-kernel'
import { patchDocumentUseCase } from '../../application/useCases/factory'

class PatchDocumentController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { collection, id } = this.req.params
    const document = this.req.body

    const useCase = patchDocumentUseCase()
    const documentPatchResult = await useCase.execute({ collection, id, document })

    this.success(documentPatchResult)
  }
}

export { PatchDocumentController }
