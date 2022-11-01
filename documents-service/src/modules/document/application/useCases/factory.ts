// Domain
import { 
    createDocumentRequestValueObject, 
    findDocumentRequestValueObject 
} from '../../domain/valueObjects/factory'
import { documentEntity } from '../../domain/entities/factory'
import { 
    createDocumentService, 
    deleteDocumentService, 
    getDocumentService,
    findDocumentService 
} from '../../domain/services/factory'
// Use cases
import { CreateDocumentUseCase } from './CreateDocumentUseCase'
import { DeleteDocumentUseCase } from './DeleteDocumentUseCase'
import { GetDocumentUseCase } from './GetDocumentUseCase'
import { FindDocumentUseCase } from './FindDocumentUseCase'

const createDocumentUseCase = (): CreateDocumentUseCase => new CreateDocumentUseCase({
    createDocumentRequestValueObject,
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

export { createDocumentUseCase, deleteDocumentUseCase, getDocumentUseCase, findDocumentUseCase }
