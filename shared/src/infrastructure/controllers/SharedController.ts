class SharedController {
    protected req: any
    protected res: any
  
    constructor (req, res) {
      this.req = req
      this.res = res
    }
  
    public async execute (): Promise<void> {
      try {
        await this.safeExecute()
      } catch (e) {
        this.error(e)
      }
    }

    public async internalExecute(...args: any[]): Promise<any> {
      try {
        return await this.safeInternalExecute(...args)
      } catch (e) {
        return null
      }
    }

    protected async safeInternalExecute(...args: any[]): Promise<any> {
      throw new Error('notImplementedException')
    }

    protected async safeExecute(): Promise<void> {
      this.error('notImplementedException')
    }

    protected success(message?: any): void {
      this.res.status(200).json({success: true, message})
    }

    protected error(message?: any): void {
      if (process.env.NODE_ENV === 'development')
        console.dir(message)
      this.res.status(500).json({success: false, message})
    }
  }
  
  export { SharedController }
  