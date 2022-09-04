import * as dotenv from 'dotenv'
import express from 'express'
import {LoginControllersFactory} from './modules/login/infrastructure/controllers/factory'

dotenv.config({ path: '../.env' })
const app = express()

app.get('/login/:email', (req, res) => LoginControllersFactory.startLoginController(req, res).execute())

app.listen(process.env.PASS_AUTH_PORT, () => {
    console.log(`Authentication service is running on port ${process.env.PASS_AUTH_PORT}`)
})