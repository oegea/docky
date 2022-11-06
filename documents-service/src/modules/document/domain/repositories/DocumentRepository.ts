import { CreateDocumentRequestValueObject } from '../valueObjects/CreateDocumentRequestValueObject'
import { DocumentEntity } from '../entities/DocumentEntity'
import { DocumentEntityListValueObject } from '../valueObjects/DocumentEntityListValueObject'
import { FindDocumentRequestValueObject } from '../valueObjects/FindDocumentRequestValueObject'

interface DocumentRepository {
  create: (createDocumentRequestValueObject: CreateDocumentRequestValueObject) => Promise<DocumentEntity>
  delete: (documentEntity: DocumentEntity) => Promise<Boolean>
  find: (findDocumentRequestValueObject: FindDocumentRequestValueObject) => Promise<DocumentEntityListValueObject>
  get: (documentEntity: DocumentEntity) => Promise<DocumentEntity>
  patch: (documentEntity: DocumentEntity) => Promise<DocumentEntity>
}
export { DocumentRepository }
