import { SharedController } from 'passager-backend-shared-kernel'
import { createDocumentUseCase } from '../../application/useCases/factory'

class CreateDocumentController extends SharedController {

  public async safeInternalExecute (collection: string, document: any): Promise<any> {
    const useCase = createDocumentUseCase()
    const documentCreationResult = await useCase.execute({
      collection,
      currentUserId: 'SYSTEM',
      document
    })

    return documentCreationResult
  }


  public async safeExecute (): Promise<void> {
    const { collection } = this.req.params
    const document = this.req.body

    const useCase = createDocumentUseCase()
    const documentCreationResult = await useCase.execute({ 
      collection,
      currentUserId: this.req.user.email, 
      document 
    })

    this.success(documentCreationResult)
  }
}

export { CreateDocumentController }
