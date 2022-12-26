import { CreateDocumentController } from './CreateDocumentController'
import { CreateSubDocumentController } from './CreateSubDocumentController'
import { DeleteDocumentController } from './DeleteDocumentController'
import { DeleteSubDocumentController } from './DeleteSubDocumentController'
import { FindDocumentController } from './FindDocumentController'
import { FindSubDocumentController } from './FindSubDocumentController'
import { GetDocumentController } from './GetDocumentController'
import { GetSubDocumentController } from './GetSubDocumentController'
import { PatchDocumentController } from './PatchDocumentController'
// import { PatchSubDocumentController } from './PatchSubDocumentController'
import { SharedController } from 'passager-backend-shared-kernel'

const createDocumentController = (req, res): SharedController => new CreateDocumentController(req, res)
const createSubDocumentController = (req, res): SharedController => new CreateSubDocumentController(req, res)
const deleteDocumentController = (req, res): SharedController => new DeleteDocumentController(req, res)
const deleteSubDocumentController = (req, res): SharedController => new DeleteSubDocumentController(req, res)
const findDocumentController = (req, res): SharedController => new FindDocumentController(req, res)
const findSubDocumentController = (req, res): SharedController => new FindSubDocumentController(req, res)
const getDocumentController = (req, res): SharedController => new GetDocumentController(req, res)
const getSubDocumentController = (req, res): SharedController => new GetSubDocumentController(req, res)
const patchDocumentController = (req, res): SharedController => new PatchDocumentController(req, res)
// const patchSubDocumentController = (req, res): SharedController => new PatchSubDocumentController(req, res)

export { 
    createDocumentController, 
    createSubDocumentController, 
    deleteDocumentController, 
    deleteSubDocumentController,
    findDocumentController, 
    findSubDocumentController,
    getDocumentController, 
    getSubDocumentController,
    patchDocumentController,
    // patchSubDocumentController
}
