import { SharedController } from 'passager-backend-shared-kernel'
import { findSubDocumentUseCase } from '../../application/useCases/factory'

class FindSubDocumentController extends SharedController {

  public async safeInternalExecute (collection: string, parentId: string, subCollection: string, criteria: any): Promise<any> {
    const useCase = findSubDocumentUseCase()
    const searchResult = await useCase.execute({
      collection,
      currentUserId: 'SYSTEM',
      parentId,
      subCollection,
      criteria
    })

    return searchResult
  }
  
  public async safeExecute (): Promise<void> {
    const { collection, parentId, subCollection } = this.req.params
    const criteria = this.req.body

    const useCase = findSubDocumentUseCase()
    const searchResult = await useCase.execute({ 
      collection, 
      currentUserId: this.req.user.email,
      parentId, 
      subCollection, 
      criteria 
    })

    this.success(searchResult)
  }
}

export { FindSubDocumentController }
