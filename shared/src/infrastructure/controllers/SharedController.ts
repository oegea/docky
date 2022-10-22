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

    protected async safeExecute(): Promise<void> {
      this.error('notImplementedException')
    }

    protected success(message?: any): void {
      this.res.status(200).json({success: true, message})
    }

    protected error(message?: any): void {
      this.res.status(500).json({success: false, message})
    }
  }
  
  export { SharedController }
  