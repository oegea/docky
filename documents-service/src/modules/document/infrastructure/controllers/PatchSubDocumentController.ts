import { SharedController } from 'passager-backend-shared-kernel'
import { patchSubDocumentUseCase } from '../../application/useCases/factory'

class PatchSubDocumentController extends SharedController {
  public async safeInternalExecute (collection: string, parentId: string, subCollection: string, id: string, document: any): Promise<any> {
    const useCase = patchSubDocumentUseCase()
    const documentPatchResult = await useCase.execute({
      collection,
      currentUserId: 'SYSTEM',
      parentId,
      subCollection,
      id,
      document
    })

    return documentPatchResult
  }

  public async safeExecute (): Promise<void> {
    const { collection, parentId, subCollection, id } = this.req.params
    const document = this.req.body

    const useCase = patchSubDocumentUseCase()
    const documentPatchResult = await useCase.execute({
      collection,
      currentUserId: this.req.user.email,
      parentId,
      subCollection,
      id,
      document
    })

    this.success(documentPatchResult)
  }
}

export { PatchSubDocumentController }
