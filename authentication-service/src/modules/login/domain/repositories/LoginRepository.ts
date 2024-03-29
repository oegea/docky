import { StartLoginRequestValueObject } from '../valueObjects/StartLoginRequestValueObject'
import { ValidateLoginRequestValueObject } from '../valueObjects/ValidateLoginRequestValueObject'

interface LoginRepository {
  save: (startLoginRequestValueObject: StartLoginRequestValueObject) => Promise<boolean>
  verifyCode: (validateLoginRequestValueObject: ValidateLoginRequestValueObject) => Promise<boolean>
  removeCode: (validateLoginRequestValueObject: ValidateLoginRequestValueObject) => Promise<boolean>
  hasIpReachedLimit: (ipAddress: string, attempsByIp: number) => Promise<boolean>
}
export { LoginRepository }
