import { CreateDocumentRequestValueObject } from '../valueObjects/CreateDocumentRequestValueObject'
import { GetDocumentRequestValueObject } from '../valueObjects/GetDocumentRequestValueObject'
import { DocumentEntity } from '../entities/DocumentEntity'

interface DocumentRepository {
  create: (createDocumentRequestValueObject: CreateDocumentRequestValueObject) => Promise<DocumentEntity>
  get: (getDocumentRequestValueObject: GetDocumentRequestValueObject) => Promise<DocumentEntity>
}
export { DocumentRepository }
