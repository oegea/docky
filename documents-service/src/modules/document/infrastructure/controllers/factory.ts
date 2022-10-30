import { SharedController } from 'passager-backend-shared-kernel'
import { CreateDocumentController } from './CreateDocumentController'
import { GetDocumentController } from './GetDocumentController'

const createDocumentController = (req, res): SharedController => new CreateDocumentController(req, res)
const getDocumentController = (req, res): SharedController => new GetDocumentController(req, res)

export { createDocumentController, getDocumentController }
