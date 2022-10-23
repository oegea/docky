import { CreateDocumentRequestValueObject } from '../valueObjects/CreateDocumentRequestValueObject'

interface DocumentRepository {
  create: (createDocumentRequestValueObject: CreateDocumentRequestValueObject) => Promise<object>
}
export { DocumentRepository }
