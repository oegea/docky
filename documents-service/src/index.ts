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

const setupEvents = async () => {
  const nativeEventBusRepository = new NativeEventBusRepository()

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'CREATE_DOCUMENT', async(type: string, name: string, payloadObject: any) => { 
    const result = await createDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.document)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'CREATE_SUBDOCUMENT', async(type: string, name: string, payloadObject: any) => {
    const result = await createSubDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.parentId, payloadObject.subCollection, payloadObject.document)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'DELETE_DOCUMENT', async(type: string, name: string, payloadObject: any) => {
    const result = await deleteDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.id)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'DELETE_SUBDOCUMENT', async(type: string, name: string, payloadObject: any) => {
    const result = await deleteSubDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.parentId, payloadObject.subCollection, payloadObject.id)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'FIND_DOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await findDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.criteria)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'FIND_SUBDOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await findSubDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.parentId, payloadObject.subCollection, payloadObject.criteria)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'GET_DOCUMENT', async(type: string, name: string, payloadObject: any) => {
    const result = await getDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.id)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'GET_SUBDOCUMENT', async(type: string, name: string, payloadObject: any) => {
    const result = await getSubDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.parentId, payloadObject.subCollection, payloadObject.id)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'PATCH_DOCUMENT', async(type: string, name: string, payloadObject: any) => {
    const result = await patchDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.id, payloadObject.document)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'PATCH_SUBDOCUMENT', async(type: string, name: string, payloadObject: any) => {
    const result = await patchSubDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.parentId, payloadObject.subCollection, payloadObject.id, payloadObject.document)
    return result
  })

}

const start = () => setupEvents().then(() => app.listen(process.env.DOCS_PORT, () => {
  console.log(`Documents service is running on port ${process.env.DOCS_PORT}`)
}))

export {
  EventBusRepository, 
  NativeEventBusRepository,
  start,
  TYPE_COMMAND, 
  TYPE_QUERY,
}