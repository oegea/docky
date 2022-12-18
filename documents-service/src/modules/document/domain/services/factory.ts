// Infrastructure
import { 
  documentRepository,
  subDocumentRepository
} from '../../infrastructure/repositories/factory'
// Entities
import { documentEntity } from '../entities/factory'
// Service
import { CreateDocumentService } from './CreateDocumentService'
import { CreateSubDocumentService } from './CreateSubDocumentService'
import { GetDocumentService } from './GetDocumentService'
import { GetSubDocumentService } from './GetSubDocumentService'
import { DeleteDocumentService } from './DeleteDocumentService'
import { DeleteSubDocumentService } from './DeleteSubDocumentService'
import { FindDocumentService } from './FindDocumentService'
import { FindSubDocumentService } from './FindSubDocumentService'
import { PatchDocumentService } from './PatchDocumentService'

const createDocumentService = (): CreateDocumentService => new CreateDocumentService({
  documentRepository: documentRepository()
})

const createSubDocumentService = (): CreateSubDocumentService => new CreateSubDocumentService({
  documentEntity,
  subDocumentRepository: subDocumentRepository(),
  getDocumentService: getDocumentService()
})

const deleteDocumentService = (): DeleteDocumentService => new DeleteDocumentService({
  documentRepository: documentRepository(),
  getDocumentService: getDocumentService()
})

const deleteSubDocumentService = (): DeleteSubDocumentService => new DeleteSubDocumentService({
  subDocumentRepository: subDocumentRepository(),
  getSubDocumentService: getSubDocumentService()
})

const findDocumentService = (): FindDocumentService => new FindDocumentService({
  documentRepository: documentRepository()
})

const findSubDocumentService = (): FindSubDocumentService => new FindSubDocumentService({
  subDocumentRepository: subDocumentRepository()
})

const getDocumentService = (): GetDocumentService => new GetDocumentService({
  documentRepository: documentRepository()
})

const getSubDocumentService = (): GetSubDocumentService => new GetSubDocumentService({
  subDocumentRepository: subDocumentRepository()
})

const patchDocumentService = (): PatchDocumentService => new PatchDocumentService({
  documentRepository: documentRepository()
})

export { 
  createDocumentService, 
  createSubDocumentService, 
  deleteDocumentService, 
  deleteSubDocumentService, 
  findDocumentService, 
  findSubDocumentService,
  getDocumentService, 
  getSubDocumentService, 
  patchDocumentService 
}
