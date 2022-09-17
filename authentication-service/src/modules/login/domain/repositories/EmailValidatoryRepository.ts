interface EmailValidatorRepository {
  hasValidFormat: (email: string) => Promise<boolean>
}
export { EmailValidatorRepository }
