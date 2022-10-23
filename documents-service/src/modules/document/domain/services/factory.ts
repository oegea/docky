// Domain
import { 
  documentRepository
} from '../../infrastructure/repositories/factory'
// Service
import { CreateDocumentService } from './CreateDocumentService'

const createDocumentService = (): CreateDocumentService => new CreateDocumentService({
  documentRepository: documentRepository()
})

export { createDocumentService }
