import * as dotenv from 'dotenv'
import express from 'express'
import { 
  createDocumentController, 
  deleteDocumentController, 
  getDocumentController,
  findDocumentController 
} from './modules/document/infrastructure/controllers/factory'
import { expressValidateTokenMiddleware } from 'passager-backend-shared-kernel'

dotenv.config({ path: '../.env' })
const app = express()

app.use(expressValidateTokenMiddleware)
app.use(express.json())

app.post('/documents/:collection', (req, res) => {
  createDocumentController(req, res).execute()
})

app.get('/documents/:collection/:id', (req, res) => {
  getDocumentController(req, res).execute()
})

app.delete('/documents/:collection/:id', (req, res) => {
  deleteDocumentController(req, res).execute()
})

app.post('/documents/:collection/find', (req, res) => {
  findDocumentController(req, res).execute()
})

app.listen(process.env.DOCS_PORT, () => {
  console.log(`Documents service is running on port ${process.env.DOCS_PORT}`)
})
