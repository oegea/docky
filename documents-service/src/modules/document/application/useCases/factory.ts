// Domain
import {
  findDocumentRequestValueObject,
  findSubDocumentRequestValueObject
} from '../../domain/valueObjects/factory'
import { documentEntity, subDocumentEntity } from '../../domain/entities/factory'
import {
  createDocumentService,
  createSubDocumentService,
  deleteDocumentService,
  deleteSubDocumentService,
  getDocumentService,
  getSubDocumentService,
  findDocumentService,
  findSubDocumentService,
  patchDocumentService,
  patchSubDocumentService
} from '../../domain/services/factory'
// Use cases
import { CreateDocumentUseCase } from './CreateDocumentUseCase'
import { CreateSubDocumentUseCase } from './CreateSubDocumentUseCase'
import { DeleteDocumentUseCase } from './DeleteDocumentUseCase'
import { DeleteSubDocumentUseCase } from './DeleteSubDocumentUseCase'
import { GetDocumentUseCase } from './GetDocumentUseCase'
import { GetSubDocumentUseCase } from './GetSubDocumentUseCase'
import { FindDocumentUseCase } from './FindDocumentUseCase'
import { FindSubDocumentUseCase } from './FindSubDocumentUseCase'
import { PatchDocumentUseCase } from './PatchDocumentUseCase'
import { PatchSubDocumentUseCase } from './PatchSubDocumentUseCase'

const createDocumentUseCase = (): CreateDocumentUseCase => new CreateDocumentUseCase({
  documentEntity,
  createDocumentService: createDocumentService()
})

const createSubDocumentUseCase = (): CreateSubDocumentUseCase => new CreateSubDocumentUseCase({
  subDocumentEntity,
  createSubDocumentService: createSubDocumentService()
})

const deleteDocumentUseCase = (): DeleteDocumentUseCase => new DeleteDocumentUseCase({
  documentEntity,
  deleteDocumentService: deleteDocumentService()
})

const deleteSubDocumentUseCase = (): DeleteSubDocumentUseCase => new DeleteSubDocumentUseCase({
  subDocumentEntity,
  deleteSubDocumentService: deleteSubDocumentService()
})

const getDocumentUseCase = (): GetDocumentUseCase => new GetDocumentUseCase({
  documentEntity,
  getDocumentService: getDocumentService()
})

const getSubDocumentUseCase = (): GetSubDocumentUseCase => new GetSubDocumentUseCase({
  subDocumentEntity,
  getSubDocumentService: getSubDocumentService()
})

const findDocumentUseCase = (): FindDocumentUseCase => new FindDocumentUseCase({
  findDocumentRequestValueObject,
  findDocumentService: findDocumentService()
})

const findSubDocumentUseCase = (): FindSubDocumentUseCase => new FindSubDocumentUseCase({
  findSubDocumentRequestValueObject,
  findSubDocumentService: findSubDocumentService()
})

const patchDocumentUseCase = (): PatchDocumentUseCase => new PatchDocumentUseCase({
  documentEntity,
  patchDocumentService: patchDocumentService()
})

const patchSubDocumentUseCase = (): PatchSubDocumentUseCase => new PatchSubDocumentUseCase({
  subDocumentEntity,
  patchSubDocumentService: patchSubDocumentService()
})

export {
  createDocumentUseCase,
  createSubDocumentUseCase,
  deleteDocumentUseCase,
  deleteSubDocumentUseCase,
  getDocumentUseCase,
  getSubDocumentUseCase,
  findDocumentUseCase,
  findSubDocumentUseCase,
  patchDocumentUseCase,
  patchSubDocumentUseCase
}
