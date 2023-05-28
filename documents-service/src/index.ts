
import express from 'express'


import { setupHttpEntryPoints } from './httpEntryPoints'
import { setupEventEntryPoints } from './eventBusEntryPoints'

import {
  EventBusRepository,
  expressValidateTokenMiddleware,
  loadConfig,
  NativeEventBusRepository,
  TYPE_COMMAND,
  TYPE_QUERY
} from '@useful-tools/docky-shared-kernel'

const app = express()
app.use(expressValidateTokenMiddleware)
app.use(express.json())

const addMiddleware = (middlewareFunction: any): void => {
  app.use(middlewareFunction)
}

const getExpressApp = (): express.Application => {
  return app
}

const setupExpressService = async () => {
  await setupHttpEntryPoints(app)
  await setupEventEntryPoints()
}

const startDocumentsService = async (): Promise<express.Application> => {
  await setupExpressService()
  
  app.listen(process.env.DOCS_PORT, () => {
    console.log(`Documents service is running on port ${process.env.DOCS_PORT}`)
  })

  return app
}

export {
  addMiddleware,
  getExpressApp,
  setupExpressService,
  EventBusRepository,
  loadConfig,
  NativeEventBusRepository,
  startDocumentsService,
  TYPE_COMMAND,
  TYPE_QUERY,
}
