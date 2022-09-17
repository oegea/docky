import { StartLoginRequestValueObject } from '../../domain/valueObjects/startLoginRequestValueObject'
import { StartLoginService } from '../../domain/services/StartLoginService'

class StartLoginUseCase {
  private readonly startLoginRequestValueObject: ({ email }: {email: string}) => Promise<StartLoginRequestValueObject>
  private readonly startLoginService: StartLoginService

  constructor ({
    startLoginRequestValueObject,
    startLoginService
  }: {
    startLoginRequestValueObject: ({ email }: {email: string}) => Promise<StartLoginRequestValueObject>
    startLoginService: StartLoginService
  }) {
    this.startLoginRequestValueObject = startLoginRequestValueObject
    this.startLoginService = startLoginService
  }

  public async execute ({ email }: {email: string}): Promise<void> {
    try {
      const startLoginRequestValueObject = await this.startLoginRequestValueObject({ email })
      return await this.startLoginService.execute({ startLoginRequestValueObject })
    } catch (e) {
      throw e.message
    }
  }
}

export { StartLoginUseCase }
