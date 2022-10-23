import { SharedController } from 'passager-backend-shared-kernel'
import { CreateDocumentController } from './CreateDocumentController'

const createDocumentController = (req, res): SharedController => new CreateDocumentController(req, res)

export { createDocumentController }
