class BasicController {
  protected req: any
  protected res: any

  constructor (req, res) {
    this.req = req
    this.res = res
  }

  public async execute (): Promise<void> {
    this.res.status(501).json({ success: false, message: 'notImplementedException' })
  }
}

export { BasicController }
