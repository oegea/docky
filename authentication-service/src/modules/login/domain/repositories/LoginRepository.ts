import { StartLoginRequestValueObject } from '../valueObjects/StartLoginRequestValueObject'

interface LoginRepository {
  save: (startLoginRequestValueObject: StartLoginRequestValueObject) => Promise<boolean>
}
export { LoginRepository }
