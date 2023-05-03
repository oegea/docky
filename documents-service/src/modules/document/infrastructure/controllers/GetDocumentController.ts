import { SharedController } from 'passager-backend-shared-kernel'
import { getDocumentUseCase } from '../../application/useCases/factory'

class GetDocumentController extends SharedController {
  public async safeInternalExecute (collection: string, id: string): Promise<any> {
    const useCase = getDocumentUseCase()
    const getDocumentResult = await useCase.execute({
      collection,
      currentUserId: 'SYSTEM',
      id
    })

    return getDocumentResult
  }

  public async safeExecute (): Promise<void> {
    const { collection, id } = this.req.params

    const useCase = getDocumentUseCase()
    const getDocumentResult = await useCase.execute({
      collection,
      currentUserId: this.req.user.email,
      id
    })

    this.success(getDocumentResult)
  }
}

export { GetDocumentController }
