import * as dotenv from 'dotenv'
import express from 'express'
import { 
  createDocumentController, 
  deleteDocumentController, 
  getDocumentController,
  findDocumentController,
  patchDocumentController 
} from './modules/document/infrastructure/controllers/factory'
import { expressValidateTokenMiddleware } from 'passager-backend-shared-kernel'

dotenv.config({ path: '../.env' })
const app = express()

app.use(expressValidateTokenMiddleware)
app.use(express.json())

/* Documents */

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

app.patch('/documents/:collection/:id', (req, res) => {
  patchDocumentController(req, res).execute()
})

/* Subdocuments */

app.post('/document/:collection/:parentId/:subcollection', (req, res) => {
  res.status(501).json({success: false, message: 'Subdocument creation is not yet implemented'})
})

app.get('/documents/:collection/:parentId/:subcollection/:id', (req, res) => {
  res.status(501).json({success: false, message: 'Subdocument get is not yet implemented'})
})

app.delete('/document/:collection/:parentId/:subcollection/:id', (req, res) => {
  res.status(501).json({success: false, message: 'Subdocument delete is not yet implemented'})
})

app.post('/documents/:collection/:parentId/:subcollection/find', (req, res) => {
  res.status(501).json({success: false, message: 'Subdocument find is not yet implemented'})
})

app.patch('/documents/:collection/:parentId/:subcollection/:id', (req, res) => {
  res.status(501).json({success: false, message: 'Subdocument update is not yet implemented'})
})

app.listen(process.env.DOCS_PORT, () => {
  console.log(`Documents service is running on port ${process.env.DOCS_PORT}`)
})
