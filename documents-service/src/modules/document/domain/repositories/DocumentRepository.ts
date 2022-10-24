import { CreateDocumentRequestValueObject } from '../valueObjects/CreateDocumentRequestValueObject'
import { DocumentEntity } from '../entities/DocumentEntity'

interface DocumentRepository {
  create: (createDocumentRequestValueObject: CreateDocumentRequestValueObject) => Promise<DocumentEntity>
}
export { DocumentRepository }
