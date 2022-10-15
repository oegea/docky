import { BasicController } from '../../../basic/infrastructure/controllers/BasicController'
import { validateLoginUseCase } from '../../application/useCases/factory'

class ValidateLoginController extends BasicController {
  public async execute (): Promise<void> {
    try {
      const { email, code } = this.req.params
      const number = parseInt(code)

      const useCase = validateLoginUseCase()
      const token = await useCase.execute({ email, code: number })
      this.res.status(200).json({ success: true, token })
    } catch (e) {
      this.res.status(500).json({ success: false, message: e })
    }
  }
}

export { ValidateLoginController }
