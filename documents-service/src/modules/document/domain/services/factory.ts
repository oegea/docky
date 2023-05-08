// Infrastructure
import {
  documentRepository,
  subDocumentRepository
} from '../../infrastructure/repositories/factory'
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
import { operationPayloadPermissionsValueObject } from '../../../permissions/domain/valueObjects/factory'
import {
  NativeEventBusRepository
} from '@useful-tools/docky-shared-kernel'

const createDocumentService = (): CreateDocumentService => new CreateDocumentService({
  documentRepository: documentRepository(),
  getOperationPermissionsService: getOperationPermissionsService(),
  operationPayloadPermissionsValueObject
})

const createSubDocumentService = (): CreateSubDocumentService => new CreateSubDocumentService({
  eventBusRepository: new NativeEventBusRepository(),
  subDocumentRepository: subDocumentRepository(),
  getOperationPermissionsService: getOperationPermissionsService(),
  operationPayloadPermissionsValueObject
})

const deleteDocumentService = (): DeleteDocumentService => new DeleteDocumentService({
  documentRepository: documentRepository(),
  getDocumentService: getDocumentService(),
  getOperationPermissionsService: getOperationPermissionsService(),
  operationPayloadPermissionsValueObject
})

const deleteSubDocumentService = (): DeleteSubDocumentService => new DeleteSubDocumentService({
  eventBusRepository: new NativeEventBusRepository(),
  subDocumentRepository: subDocumentRepository(),
  getOperationPermissionsService: getOperationPermissionsService(),
  operationPayloadPermissionsValueObject
})

const findDocumentService = (): FindDocumentService => new FindDocumentService({
  documentRepository: documentRepository(),
  getOperationPermissionsService: getOperationPermissionsService(),
  operationPayloadPermissionsValueObject
})

const findSubDocumentService = (): FindSubDocumentService => new FindSubDocumentService({
  subDocumentRepository: subDocumentRepository(),
  getOperationPermissionsService: getOperationPermissionsService(),
  operationPayloadPermissionsValueObject
})

const getDocumentService = (): GetDocumentService => new GetDocumentService({
  documentRepository: documentRepository(),
  getOperationPermissionsService: getOperationPermissionsService(),
  operationPayloadPermissionsValueObject
})

const getSubDocumentService = (): GetSubDocumentService => new GetSubDocumentService({
  subDocumentRepository: subDocumentRepository(),
  getOperationPermissionsService: getOperationPermissionsService(),
  operationPayloadPermissionsValueObject
})

const patchDocumentService = (): PatchDocumentService => new PatchDocumentService({
  documentRepository: documentRepository(),
  getOperationPermissionsService: getOperationPermissionsService(),
  operationPayloadPermissionsValueObject
})

const patchSubDocumentService = (): PatchSubDocumentService => new PatchSubDocumentService({
  subDocumentRepository: subDocumentRepository(),
  getOperationPermissionsService: getOperationPermissionsService(),
  operationPayloadPermissionsValueObject
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
