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
import { PatchSubDocumentService } from './PatchSubDocumentService'
// Other modules services
import { getOperationPermissionsService } from '../../../permissions/domain/services/factory'

const createDocumentService = (): CreateDocumentService => new CreateDocumentService({
  documentRepository: documentRepository(),
  getOperationPermissionsService: getOperationPermissionsService()
})

const createSubDocumentService = (): CreateSubDocumentService => new CreateSubDocumentService({
  documentEntity,
  subDocumentRepository: subDocumentRepository(),
  getDocumentService: getDocumentService(),
  getOperationPermissionsService: getOperationPermissionsService()
})

const deleteDocumentService = (): DeleteDocumentService => new DeleteDocumentService({
  documentRepository: documentRepository(),
  getDocumentService: getDocumentService(),
  getOperationPermissionsService: getOperationPermissionsService()
})

const deleteSubDocumentService = (): DeleteSubDocumentService => new DeleteSubDocumentService({
  subDocumentRepository: subDocumentRepository(),
  getSubDocumentService: getSubDocumentService(),
  getOperationPermissionsService: getOperationPermissionsService()
})

const findDocumentService = (): FindDocumentService => new FindDocumentService({
  documentRepository: documentRepository(),
  getOperationPermissionsService: getOperationPermissionsService()
})

const findSubDocumentService = (): FindSubDocumentService => new FindSubDocumentService({
  subDocumentRepository: subDocumentRepository(),
  getOperationPermissionsService: getOperationPermissionsService()
})

const getDocumentService = (): GetDocumentService => new GetDocumentService({
  documentRepository: documentRepository(),
  getOperationPermissionsService: getOperationPermissionsService()
})

const getSubDocumentService = (): GetSubDocumentService => new GetSubDocumentService({
  subDocumentRepository: subDocumentRepository(),
  getOperationPermissionsService: getOperationPermissionsService()
})

const patchDocumentService = (): PatchDocumentService => new PatchDocumentService({
  documentRepository: documentRepository(),
  getOperationPermissionsService: getOperationPermissionsService()
})

const patchSubDocumentService = (): PatchSubDocumentService => new PatchSubDocumentService({
  subDocumentRepository: subDocumentRepository(),
  getOperationPermissionsService: getOperationPermissionsService()
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
  patchDocumentService,
  patchSubDocumentService 
}
