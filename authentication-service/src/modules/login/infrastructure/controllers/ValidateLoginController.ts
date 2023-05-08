import { SharedController } from '@useful-tools/docky-shared-kernel'
import { validateLoginUseCase } from '../../application/useCases/factory'

class ValidateLoginController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { email, code } = this.req.params
    const number = parseInt(code)

    const useCase = validateLoginUseCase()
    const token = await useCase.execute({ email, code: number })
    this.success(token)
  }
}

export { ValidateLoginController }
