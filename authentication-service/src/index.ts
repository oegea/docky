import express from 'express'
import { startLoginController, validateLoginController } from './modules/login/infrastructure/controllers/factory'
import {
  loadConfig
} from '@useful-tools/docky-shared-kernel'

const app = express()

app.get('/login/:email', (req, res) => {
  startLoginController(req, res).execute()
})

app.get('/login/:email/validate/:code', (req, res) => {
  validateLoginController(req, res).execute()
})

export const startAuthenticationService = () => app.listen(process.env.AUTH_PORT, () => {
  console.log(`Authentication service is running on port ${process.env.AUTH_PORT}`)
})

export {loadConfig}