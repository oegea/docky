import { CreateDocumentController } from './CreateDocumentController'
import { DeleteDocumentController } from './DeleteDocumentController'
import { FindDocumentController } from './FindDocumentController'
import { GetDocumentController } from './GetDocumentController'
import { SharedController } from 'passager-backend-shared-kernel'

const createDocumentController = (req, res): SharedController => new CreateDocumentController(req, res)
const deleteDocumentController = (req, res): SharedController => new DeleteDocumentController(req, res)
const findDocumentController = (req, res): SharedController => new FindDocumentController(req, res)
const getDocumentController = (req, res): SharedController => new GetDocumentController(req, res)

export { createDocumentController, deleteDocumentController, findDocumentController, getDocumentController }
