import express from 'express'
import { startLoginController, validateLoginController } from './modules/login/infrastructure/controllers/factory'
import {
  loadConfig,
  expressEnableCorsMiddleware,
  expressValidateTokenMiddleware
} from '@useful-tools/docky-shared-kernel'

const app = express()

app.use(expressValidateTokenMiddleware)
app.use(expressEnableCorsMiddleware)
app.use(express.json())
  
app.get('/login/:email', (req, res) => {
  startLoginController(req, res).execute()
})

app.get('/login/:email/validate/:code', (req, res) => {
  validateLoginController(req, res).execute()
})

export const startAuthenticationService = async (): Promise<express.Application> => {
  app.listen(process.env.AUTH_PORT, () => {
    console.log(`Authentication service is running on port ${process.env.AUTH_PORT}`)
  })

  return app
}

export const addMiddleware = (middlewareFunction: any): void => {
  app.use(middlewareFunction)
}

export const getExpressApp = (): express.Application => {
  return app
}

export {loadConfig}