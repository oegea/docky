import { CreateDocumentRequestValueObject } from './CreateDocumentRequestValueObject'
import { FindDocumentRequestValueObject } from './FindDocumentRequestValueObject'
import { DocumentEntityListValueObject } from './DocumentEntityListValueObject'

const createDocumentRequestValueObject = async({
  collection,
  document
}: {
  collection: string,
  document: object
}): Promise<CreateDocumentRequestValueObject> => {
  const createDocumentRequestValueObject = new CreateDocumentRequestValueObject({
    collection,
    document
  })

  return createDocumentRequestValueObject
}

const documentEntityListValueObject = async(): Promise<DocumentEntityListValueObject> => new DocumentEntityListValueObject()

const findDocumentRequestValueObject = async({
  collection,
  criteria
}: {
  collection: string,
  criteria: object
}): Promise<FindDocumentRequestValueObject> => {
  const findDocumentRequestValueObject = new FindDocumentRequestValueObject({
    collection,
    criteria
  })

  return findDocumentRequestValueObject
}

export { createDocumentRequestValueObject, documentEntityListValueObject, findDocumentRequestValueObject }
