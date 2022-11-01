import { SharedController } from 'passager-backend-shared-kernel'
import { findDocumentUseCase } from '../../application/useCases/factory'

class FindDocumentController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { collection } = this.req.params
    const criteria = this.req.body

    const useCase = findDocumentUseCase()
    const searchResult = await useCase.execute({ collection, criteria })

    this.success(searchResult)
  }
}

export { FindDocumentController }
