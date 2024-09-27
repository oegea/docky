import { SharedController } from '@useful-tools/docky-shared-kernel'
import { validateLoginUseCase } from '../../application/useCases/factory'

class ValidateLoginController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { email, code } = this.req.params
    const { sessionDetails } = this.req.body

    const number = parseInt(code)

    const useCase = validateLoginUseCase()
    const token = await useCase.execute({ email, code: number, sessionDetails })
    this.success(token)
  }
}

export { ValidateLoginController }
