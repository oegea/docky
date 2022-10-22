import { SharedController } from 'passager-backend-shared-kernel'
import { startLoginUseCase } from '../../application/useCases/factory'

class StartLoginController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { email } = this.req.params

    const useCase = startLoginUseCase()
    await useCase.execute({ email })
    this.success()
  }
}

export { StartLoginController }
