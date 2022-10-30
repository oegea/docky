import { SharedController } from 'passager-backend-shared-kernel'
import { getDocumentUseCase } from '../../application/useCases/factory'

class GetDocumentController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { collection, id } = this.req.params

    const useCase = getDocumentUseCase()
    const getDocumentResult = await useCase.execute({ collection, id })

    this.success(getDocumentResult)
  }
}

export { GetDocumentController }
