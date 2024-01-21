import { SharedController } from '@useful-tools/docky-shared-kernel'
import { startLoginUseCase } from '../../application/useCases/factory'

class StartLoginController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { email } = this.req.params
    // Authentication service is designed to be placed under a proxy, otherwise this will be unsafe
    const ipAddress = this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress

    const useCase = startLoginUseCase()
    await useCase.execute({ email, ipAddress })
    this.success()
  }
}

export { StartLoginController }
