import express from 'express'
import cors from 'cors'
import { startLoginController, validateLoginController } from './modules/login/infrastructure/controllers/factory'
import {
  loadConfig,
  expressEnableCorsMiddleware
} from '@useful-tools/docky-shared-kernel'

const app = express()

const setupExpressService = async () => {
  app.use(expressEnableCorsMiddleware)
  
  app.get('/login/:email', (req, res) => {
    startLoginController(req, res).execute()
  })
  
  app.get('/login/:email/validate/:code', (req, res) => {
    validateLoginController(req, res).execute()
  })
}


export const startAuthenticationService = async (): Promise<express.Application> => {
  await setupExpressService()
  
  app.listen(process.env.AUTH_PORT, () => {
    console.log(`Authentication service is running on port ${process.env.AUTH_PORT}`)
  })

  return app
}

export {loadConfig}