// Domain
import { 
  documentRepository
} from '../../infrastructure/repositories/factory'
// Service
import { CreateDocumentService } from './CreateDocumentService'
import { GetDocumentService } from './GetDocumentService'
import { DeleteDocumentService } from './DeleteDocumentService'

const createDocumentService = (): CreateDocumentService => new CreateDocumentService({
  documentRepository: documentRepository()
})

const deleteDocumentService = (): DeleteDocumentService => new DeleteDocumentService({
  documentRepository: documentRepository(),
  getDocumentService: getDocumentService()
})

const getDocumentService = (): GetDocumentService => new GetDocumentService({
  documentRepository: documentRepository()
})

export { createDocumentService, deleteDocumentService, getDocumentService }
