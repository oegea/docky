// Domain
import { createDocumentRequestValueObject } from '../../domain/valueObjects/factory'
import { documentEntity } from '../../domain/entities/factory'
import { createDocumentService, deleteDocumentService, getDocumentService } from '../../domain/services/factory'
// Use cases
import { CreateDocumentUseCase } from './CreateDocumentUseCase'
import { DeleteDocumentUseCase } from './DeleteDocumentUseCase'
import { GetDocumentUseCase } from './GetDocumentUseCase'

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

export { createDocumentUseCase, deleteDocumentUseCase, getDocumentUseCase }
