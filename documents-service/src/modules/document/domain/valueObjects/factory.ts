import { FindDocumentRequestValueObject } from './FindDocumentRequestValueObject'
import { DocumentEntityListValueObject } from './DocumentEntityListValueObject'

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

export { documentEntityListValueObject, findDocumentRequestValueObject }
