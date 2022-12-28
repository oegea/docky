import * as dotenv from 'dotenv'
import express from 'express'
import { 
  createDocumentController, 
  createSubDocumentController,
  deleteDocumentController,
  deleteSubDocumentController, 
  getDocumentController,
  getSubDocumentController,
  findDocumentController,
  findSubDocumentController,
  patchDocumentController,
  patchSubDocumentController
} from './modules/document/infrastructure/controllers/factory'

import { 
  EventBusRepository, 
  expressValidateTokenMiddleware, 
  NativeEventBusRepository,
  TYPE_COMMAND, 
  TYPE_QUERY, 
} from 'passager-backend-shared-kernel'

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

app.post('/documents/:collection/:parentId/:subCollection', (req, res) => {
  createSubDocumentController(req, res).execute()
})

app.get('/documents/:collection/:parentId/:subCollection/:id', (req, res) => {
  getSubDocumentController(req, res).execute()
})

app.delete('/documents/:collection/:parentId/:subCollection/:id', (req, res) => {
  deleteSubDocumentController(req, res).execute()
})

app.post('/documents/:collection/:parentId/:subCollection/find', (req, res) => {
  findSubDocumentController(req, res).execute()
})

app.patch('/documents/:collection/:parentId/:subCollection/:id', (req, res) => {
  patchSubDocumentController(req, res).execute()
})

const start = () => app.listen(process.env.DOCS_PORT, () => {
  console.log(`Documents service is running on port ${process.env.DOCS_PORT}`)
})

start()

new NativeEventBusRepository().subscribe(TYPE_QUERY, 'GET_OPERATION_PERMISSIONS', async (type, name, payload) => true)

export {
  EventBusRepository, 
  NativeEventBusRepository,
  start,
  TYPE_COMMAND, 
  TYPE_QUERY,
}