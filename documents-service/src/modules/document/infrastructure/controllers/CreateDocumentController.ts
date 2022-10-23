import { SharedController } from 'passager-backend-shared-kernel'
import { createDocumentUseCase } from '../../application/useCases/factory'

class CreateDocumentController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { collection } = this.req.params
    const document = this.req.body

    const useCase = createDocumentUseCase()
    const documentCreationResult = await useCase.execute({ collection, document })

    this.success(documentCreationResult)
  }
}

export { CreateDocumentController }
