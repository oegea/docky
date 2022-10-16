import { ValidateLoginRequestValueObject } from '../valueObjects/ValidateLoginRequestValueObject'

interface TokenGeneratorRepository {
  generateToken: (validateLoginRequestValueObject: ValidateLoginRequestValueObject) => Promise<string>
}
export { TokenGeneratorRepository }
