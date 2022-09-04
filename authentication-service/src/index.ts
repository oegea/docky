import * as dotenv from 'dotenv'
import express from 'express'
import { startLoginController, validateLoginController } from './modules/login/infrastructure/controllers/factory'

dotenv.config({ path: '../.env' })
const app = express()

app.get('/login/:email', (req, res) => {
  startLoginController(req, res).execute()
})
app.get('/login/:email/validate/:code', (req, res) => {
  validateLoginController(req, res).execute()
})

app.listen(process.env.PASS_AUTH_PORT, () => {
  console.log(`Authentication service is running on port ${process.env.PASS_AUTH_PORT}`)
})
