// Domain
import { createDocumentRequestValueObject } from '../../domain/valueObjects/factory'
import { createDocumentService } from '../../domain/services/factory'
// Use cases
import { CreateDocumentUseCase } from './CreateDocumentUseCase'

const createDocumentUseCase = (): CreateDocumentUseCase => new CreateDocumentUseCase({
    createDocumentRequestValueObject,
    createDocumentService: createDocumentService()
})

export { createDocumentUseCase }
