import { CreateDocumentRequestValueObject } from '../valueObjects/CreateDocumentRequestValueObject'
import { DocumentEntity } from '../entities/DocumentEntity'

interface DocumentRepository {
  create: (createDocumentRequestValueObject: CreateDocumentRequestValueObject) => Promise<DocumentEntity>
  delete: (documentEntity: DocumentEntity) => Promise<Boolean>
  get: (documentEntity: DocumentEntity) => Promise<DocumentEntity>
}
export { DocumentRepository }
