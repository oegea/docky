import { SharedController } from '@useful-tools/docky-shared-kernel'
import { validateLoginUseCase } from '../../application/useCases/factory'

class ValidateLoginController extends SharedController {
  public async safeExecute (): Promise<void> {
    const { email, code } = this.req.params
    const { sessionDetails } = this.req.body

    const number = parseInt(code)

    // Defense in depth: Ensure skipCodeValidation can only be set by custom middlewares,
    // not by user-controlled inputs (query params or body)
    // This protects against consumers who add middlewares that copy query/body to req
    const skipCodeValidation = this.isValidSkipCodeValidation()

    const useCase = validateLoginUseCase()
    const token = await useCase.execute({ email, code: number, sessionDetails, skipCodeValidation })
    this.success(token)
  }

  private isValidSkipCodeValidation (): boolean {
    // Check if skipCodeValidation is set on req (by custom middleware)
    if (this.req.skipCodeValidation !== 'true') {
      return false
    }

    // Security: Ensure it's NOT coming from user-controlled inputs
    // If it exists in query or body, it's a security violation attempt
    if (this.req.query?.skipCodeValidation !== undefined) {
      console.warn('Security: Attempted to set skipCodeValidation via query params - ignoring')
      return false
    }

    if (this.req.body?.skipCodeValidation !== undefined) {
      console.warn('Security: Attempted to set skipCodeValidation via body - ignoring')
      return false
    }

    // Valid: skipCodeValidation was set by a custom middleware, not by user input
    return true
  }
}

export { ValidateLoginController }
