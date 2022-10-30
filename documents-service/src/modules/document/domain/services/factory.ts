// Domain
import { 
  documentRepository
} from '../../infrastructure/repositories/factory'
// Service
import { CreateDocumentService } from './CreateDocumentService'
import { GetDocumentService } from './GetDocumentService'

const createDocumentService = (): CreateDocumentService => new CreateDocumentService({
  documentRepository: documentRepository()
})

const getDocumentService = (): GetDocumentService => new GetDocumentService({
  documentRepository: documentRepository()
})

export { createDocumentService, getDocumentService }
