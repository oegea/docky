import { SharedController } from '@useful-tools/docky-shared-kernel'
import { createSubDocumentUseCase } from '../../application/useCases/factory'

class CreateSubDocumentController extends SharedController {
  public async safeInternalExecute (collection: string, parentId: string, subCollection: string, documentPlainObject: any): Promise<any> {
    const useCase = createSubDocumentUseCase()
    const documentCreationResult = await useCase.execute({
      collection,
      currentUserId: 'SYSTEM',
      documentPlainObject,
      parentId,
      subCollection
    })

    return documentCreationResult
  }

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
