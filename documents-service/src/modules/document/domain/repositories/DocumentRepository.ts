import { DocumentEntity } from '../entities/DocumentEntity'
import { DocumentEntityListValueObject } from '../valueObjects/DocumentEntityListValueObject'
import { FindDocumentRequestValueObject } from '../valueObjects/FindDocumentRequestValueObject'

interface DocumentRepository {
  create: (documentEntity: DocumentEntity) => Promise<DocumentEntity>
  delete: (documentEntity: DocumentEntity) => Promise<Boolean>
  find: (findDocumentRequestValueObject: FindDocumentRequestValueObject) => Promise<DocumentEntityListValueObject>
  get: (documentEntity: DocumentEntity) => Promise<DocumentEntity>
  patch: (documentEntity: DocumentEntity) => Promise<DocumentEntity>
}
export { DocumentRepository }
