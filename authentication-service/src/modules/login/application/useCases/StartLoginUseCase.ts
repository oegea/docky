import { StartLoginRequestValueObject } from '../../domain/valueObjects/StartLoginRequestValueObject'
import { StartLoginService } from '../../domain/services/StartLoginService'

class StartLoginUseCase {
  private readonly startLoginRequestValueObject: ({ email, ipAddress }: {email: string, ipAddress: string}) => Promise<StartLoginRequestValueObject>
  private readonly startLoginService: StartLoginService

  constructor ({
    startLoginRequestValueObject,
    startLoginService
  }: {
    startLoginRequestValueObject: ({ email, ipAddress }: {email: string, ipAddress: string}) => Promise<StartLoginRequestValueObject>
    startLoginService: StartLoginService
  }) {
    this.startLoginRequestValueObject = startLoginRequestValueObject
    this.startLoginService = startLoginService
  }

  public async execute ({ email, ipAddress }: {email: string, ipAddress: string}): Promise<void> {
    try {
      const startLoginRequestValueObject = await this.startLoginRequestValueObject({ email, ipAddress })
      return await this.startLoginService.execute({ startLoginRequestValueObject })
    } catch (e) {
      throw e.message
    }
  }
}

export { StartLoginUseCase }
