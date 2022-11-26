// Domain
import {
    findDocumentRequestValueObject 
} from '../../domain/valueObjects/factory'
import { documentEntity, subDocumentEntity } from '../../domain/entities/factory'
import { 
    createDocumentService,
    createSubDocumentService, 
    deleteDocumentService, 
    getDocumentService,
    getSubDocumentService,
    findDocumentService,
    patchDocumentService 
} from '../../domain/services/factory'
// Use cases
import { CreateDocumentUseCase } from './CreateDocumentUseCase'
import { CreateSubDocumentUseCase } from './CreateSubDocumentUseCase'
import { DeleteDocumentUseCase } from './DeleteDocumentUseCase'
import { GetDocumentUseCase } from './GetDocumentUseCase'
import { GetSubDocumentUseCase } from './GetSubDocumentUseCase'
import { FindDocumentUseCase } from './FindDocumentUseCase'
import { PatchDocumentUseCase } from './PatchDocumentUseCase'

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

const patchDocumentUseCase = (): PatchDocumentUseCase => new PatchDocumentUseCase({
    documentEntity,
    patchDocumentService: patchDocumentService()
})

export { 
    createDocumentUseCase, 
    createSubDocumentUseCase,
    deleteDocumentUseCase, 
    getDocumentUseCase,
    getSubDocumentUseCase, 
    findDocumentUseCase, 
    patchDocumentUseCase 
}
