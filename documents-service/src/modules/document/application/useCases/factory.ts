// Domain
import { createDocumentRequestValueObject, getDocumentRequestValueObject } from '../../domain/valueObjects/factory'
import { createDocumentService, getDocumentService } from '../../domain/services/factory'
// Use cases
import { CreateDocumentUseCase } from './CreateDocumentUseCase'
import { GetDocumentUseCase } from './GetDocumentUseCase'

const createDocumentUseCase = (): CreateDocumentUseCase => new CreateDocumentUseCase({
    createDocumentRequestValueObject,
    createDocumentService: createDocumentService()
})

const getDocumentUseCase = (): GetDocumentUseCase => new GetDocumentUseCase({
    getDocumentRequestValueObject,
    getDocumentService: getDocumentService()
})

export { createDocumentUseCase, getDocumentUseCase }
