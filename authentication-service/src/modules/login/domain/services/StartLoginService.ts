import { StartLoginRequestValueObject } from '../valueObjects/StartLoginRequestValueObject'
import { RandomNumberGeneratorRepository } from '../repositories/RandomNumberGeneratorRepository'

class StartLoginService {
  private readonly randomNumberGeneratorRepository: RandomNumberGeneratorRepository

  constructor ({
    randomNumberGeneratorRepository
  }: {
    randomNumberGeneratorRepository: RandomNumberGeneratorRepository
  }) {
    this.randomNumberGeneratorRepository = randomNumberGeneratorRepository
  }

  public async execute ({
    startLoginRequestValueObject
  }: {
    startLoginRequestValueObject: StartLoginRequestValueObject
  }): Promise<void> {
    // Generate a random number
    const randomNumber = await this.randomNumberGeneratorRepository.generateRandomNumber(1000000, 9999999)
    // Store it
    console.log(`TODO: Store number, it was ${randomNumber}`)
    // Send e-mail
    console.log('TODO: Send e-mail')
  }
}

export { StartLoginService }
