import {StartLoginRequestValueObject} from '../../domain/valueObjects/startLoginRequestValueObject'

class StartLoginUseCase {

	private startLoginRequestValueObject: ({email}: {email: string}) => Promise<StartLoginRequestValueObject>

	constructor({startLoginRequestValueObject}: {startLoginRequestValueObject: ({email}: {email: string}) => Promise<StartLoginRequestValueObject>}) {
		this.startLoginRequestValueObject = startLoginRequestValueObject
	}

  public async execute ({email}: {email: string}): Promise<void> {
		try {
			const startLoginRequestValueObject = await this.startLoginRequestValueObject({email})
		} catch(e){
			throw e.message
		}
		
    

    // Generate a random number
    // Store it
    // Send e-mail
  }
}

export { StartLoginUseCase }
