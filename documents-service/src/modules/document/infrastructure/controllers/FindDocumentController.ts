import { SharedController } from 'passager-backend-shared-kernel'
import { findDocumentUseCase } from '../../application/useCases/factory'

class FindDocumentController extends SharedController {
  public async safeInternalExecute (collection: string, criteria: any): Promise<any> {
    const useCase = findDocumentUseCase()
    const searchResult = await useCase.execute({
      collection,
      currentUserId: 'SYSTEM',
      criteria
    })

    return searchResult
  }

  public async safeExecute (): Promise<void> {
    const { collection } = this.req.params
    const criteria = this.req.body

    const useCase = findDocumentUseCase()
    const searchResult = await useCase.execute({
      collection,
      currentUserId: this.req.user.email,
      criteria
    })

    this.success(searchResult)
  }
}

export { FindDocumentController }
