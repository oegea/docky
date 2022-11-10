// Domain
import {
    findDocumentRequestValueObject 
} from '../../domain/valueObjects/factory'
import { documentEntity } from '../../domain/entities/factory'
import { 
    createDocumentService, 
    deleteDocumentService, 
    getDocumentService,
    findDocumentService,
    patchDocumentService 
} from '../../domain/services/factory'
// Use cases
import { CreateDocumentUseCase } from './CreateDocumentUseCase'
import { DeleteDocumentUseCase } from './DeleteDocumentUseCase'
import { GetDocumentUseCase } from './GetDocumentUseCase'
import { FindDocumentUseCase } from './FindDocumentUseCase'
import { PatchDocumentUseCase } from './PatchDocumentUseCase'

const createDocumentUseCase = (): CreateDocumentUseCase => new CreateDocumentUseCase({
    documentEntity,
    createDocumentService: createDocumentService()
})

const deleteDocumentUseCase = (): DeleteDocumentUseCase => new DeleteDocumentUseCase({
    documentEntity,
    deleteDocumentService: deleteDocumentService()
})

const getDocumentUseCase = (): GetDocumentUseCase => new GetDocumentUseCase({
    documentEntity,
    getDocumentService: getDocumentService()
})

const findDocumentUseCase = (): FindDocumentUseCase => new FindDocumentUseCase({
    findDocumentRequestValueObject,
    findDocumentService: findDocumentService()
})

const patchDocumentUseCase = (): PatchDocumentUseCase => new PatchDocumentUseCase({
    documentEntity,
    patchDocumentService: patchDocumentService()
})

export { createDocumentUseCase, deleteDocumentUseCase, getDocumentUseCase, findDocumentUseCase, patchDocumentUseCase }
