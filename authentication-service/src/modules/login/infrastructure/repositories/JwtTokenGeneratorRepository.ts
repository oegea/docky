// Domain
import { TokenGeneratorRepository } from '../../domain/repositories/TokenGeneratorRepository'
import { ValidateLoginRequestValueObject } from '../../domain/valueObjects/ValidateLoginRequestValueObject'
// Infrastructure
import jwt from 'jsonwebtoken'

class JwtTokenGeneratorRepository implements TokenGeneratorRepository {
  async generateToken (validateLoginRequestValueObject: ValidateLoginRequestValueObject): Promise<string> {
    const email = validateLoginRequestValueObject.getEmail()
    const sessionDetails = validateLoginRequestValueObject.getSessionDetails()
    const token = jwt.sign({ email, sessionDetails }, process.env.COMMON_TOKEN_SECRET, { expiresIn: '30d' })

    return token
  }
}

export { JwtTokenGeneratorRepository }
