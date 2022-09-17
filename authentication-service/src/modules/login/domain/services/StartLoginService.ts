import { StartLoginRequestValueObject } from '../valueObjects/StartLoginRequestValueObject'
import { RandomNumberGeneratorRepository } from '../repositories/RandomNumberGeneratorRepository'
import { LoginRepository } from '../repositories/LoginRepository'

class StartLoginService {
  private readonly randomNumberGeneratorRepository: RandomNumberGeneratorRepository
  private readonly loginRepository: LoginRepository

  constructor ({
    randomNumberGeneratorRepository,
    loginRepository
  }: {
    randomNumberGeneratorRepository: RandomNumberGeneratorRepository
    loginRepository: LoginRepository
  }) {
    this.randomNumberGeneratorRepository = randomNumberGeneratorRepository
    this.loginRepository = loginRepository
  }

  public async execute ({
    startLoginRequestValueObject
  }: {
    startLoginRequestValueObject: StartLoginRequestValueObject
  }): Promise<void> {
    // Generate a random number
    const randomNumber = await this.randomNumberGeneratorRepository.generateRandomNumber(1000000, 9999999)
    startLoginRequestValueObject.setRandomNumber(randomNumber)
    // Store it
    this.loginRepository.save(startLoginRequestValueObject)
    // Send e-mail
    console.log('TODO: Send e-mail')
  }
}

export { StartLoginService }
