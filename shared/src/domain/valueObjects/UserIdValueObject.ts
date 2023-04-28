class UserIdValueObject {

    private readonly userId: string
  
    constructor ({
      userId
    }: {
      userId: string
    }) {
      this.userId = userId
    }
  
    getUserId (): string {
      return this.userId
    }
  
  }
  
  export { UserIdValueObject }
  