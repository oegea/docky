// Domain
import { 
  documentRepository
} from '../../infrastructure/repositories/factory'
// Service
import { CreateDocumentService } from './CreateDocumentService'
import { GetDocumentService } from './GetDocumentService'
import { DeleteDocumentService } from './DeleteDocumentService'
import { FindDocumentService } from './FindDocumentService'
import { PatchDocumentService } from './PatchDocumentService'

const createDocumentService = (): CreateDocumentService => new CreateDocumentService({
  documentRepository: documentRepository()
})

const deleteDocumentService = (): DeleteDocumentService => new DeleteDocumentService({
  documentRepository: documentRepository(),
  getDocumentService: getDocumentService()
})

const findDocumentService = (): FindDocumentService => new FindDocumentService({
  documentRepository: documentRepository()
})

const getDocumentService = (): GetDocumentService => new GetDocumentService({
  documentRepository: documentRepository()
})

const patchDocumentService = (): PatchDocumentService => new PatchDocumentService({
  documentRepository: documentRepository()
})

export { createDocumentService, deleteDocumentService, findDocumentService, getDocumentService, patchDocumentService }
