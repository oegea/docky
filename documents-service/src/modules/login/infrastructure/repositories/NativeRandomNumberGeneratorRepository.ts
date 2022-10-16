// Domain
import { RandomNumberGeneratorRepository } from '../../domain/repositories/RandomNumberGeneratorRepository'

class NativeRandomNumberGeneratorRepository implements RandomNumberGeneratorRepository {
  async generateRandomNumber (min: number, max: number): Promise<number> {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export { NativeRandomNumberGeneratorRepository }
