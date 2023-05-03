import { StartLoginRequestValueObject } from '../valueObjects/StartLoginRequestValueObject'
import { RandomNumberGeneratorRepository } from '../repositories/RandomNumberGeneratorRepository'
import { LoginRepository } from '../repositories/LoginRepository'
import { EmailSenderRepository } from '../repositories/EmailSenderRepository'

class StartLoginService {
  private readonly emailSenderRepository: EmailSenderRepository
  private readonly loginRepository: LoginRepository
  private readonly randomNumberGeneratorRepository: RandomNumberGeneratorRepository

  constructor ({
    emailSenderRepository,
    loginRepository,
    randomNumberGeneratorRepository
  }: {
    emailSenderRepository: EmailSenderRepository
    loginRepository: LoginRepository
    randomNumberGeneratorRepository: RandomNumberGeneratorRepository
  }) {
    this.emailSenderRepository = emailSenderRepository
    this.loginRepository = loginRepository
    this.randomNumberGeneratorRepository = randomNumberGeneratorRepository
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
    const isSuccessfullSave = await this.loginRepository.save(startLoginRequestValueObject)
    if (!isSuccessfullSave) { throw new Error('StartLoginService: error while saving random verification code') }

    // Send e-mail
    const email = startLoginRequestValueObject.getEmail()
    const isSuccessfullEmailSending = await this.emailSenderRepository.send(
      email,
      `Please verify your e-mail to use ${process.env.COMMON_APP_NAME}`,
      `
        Hello,

        Your code to identify on ${process.env.COMMON_APP_NAME} is ${randomNumber}.

        Thank you for using ${process.env.COMMON_APP_NAME}.

        This e-mail has been sent by ${process.env.COMMON_ORGANIZATION_NAME}.

        --

        Hola,

        Tu código para identificarte en ${process.env.COMMON_APP_NAME} es ${randomNumber}.

        Gracias por usar ${process.env.COMMON_APP_NAME}.

        Este correo electrónico ha sido enviado por ${process.env.COMMON_ORGANIZATION_NAME}.
    `
    )

    if (!isSuccessfullEmailSending) { throw new Error('StartLoginService: error while sending verification email') }
  }
}

export { StartLoginService }
