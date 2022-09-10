import { BasicController } from '../../../basic/infrastructure/controllers/BasicController'
import {startLoginUseCase} from '../../application/useCases/factory'

class StartLoginController extends BasicController {
  public async execute (): Promise<void> {
    try{
      const {email} = this.req.params

      const useCase = startLoginUseCase()
      await useCase.execute({email})
      this.res.status(200).json({ success: true })
    }
    catch(e) {
      this.res.status(500).json({ success: false, e })
    }
  }
}

export { StartLoginController }
