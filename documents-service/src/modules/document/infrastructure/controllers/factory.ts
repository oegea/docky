import { SharedController } from 'passager-backend-shared-kernel'
import { CreateDocumentController } from './CreateDocumentController'
import { DeleteDocumentController } from './DeleteDocumentController'
import { GetDocumentController } from './GetDocumentController'

const createDocumentController = (req, res): SharedController => new CreateDocumentController(req, res)
const getDocumentController = (req, res): SharedController => new GetDocumentController(req, res)
const deleteDocumentController = (req, res): SharedController => new DeleteDocumentController(req, res)

export { createDocumentController, deleteDocumentController, getDocumentController }
