import { FindDocumentRequestValueObject } from './FindDocumentRequestValueObject'
import { FindSubDocumentRequestValueObject } from './FindSubDocumentRequestValueObject'
import { DocumentEntityListValueObject } from './DocumentEntityListValueObject'
import { SubDocumentEntityListValueObject } from './SubDocumentEntityListValueObject'

const documentEntityListValueObject = async (): Promise<DocumentEntityListValueObject> => new DocumentEntityListValueObject()

const subDocumentEntityListValueObject = async (): Promise<SubDocumentEntityListValueObject> => new SubDocumentEntityListValueObject()

const findDocumentRequestValueObject = async ({
  collection,
  criteria
}: {
  collection: string
  criteria: object
}): Promise<FindDocumentRequestValueObject> => {
  const findDocumentRequestValueObject = new FindDocumentRequestValueObject({
    collection,
    criteria
  })

  return findDocumentRequestValueObject
}

const findSubDocumentRequestValueObject = async ({
  collection,
  parentId,
  subCollection,
  criteria
}: {
  collection: string
  parentId: string
  subCollection: string
  criteria: object
}): Promise<FindSubDocumentRequestValueObject> => {
  const findSubDocumentRequestValueObject = new FindSubDocumentRequestValueObject({
    collection,
    parentId,
    subCollection,
    criteria
  })

  return findSubDocumentRequestValueObject
}

export { documentEntityListValueObject, subDocumentEntityListValueObject, findDocumentRequestValueObject, findSubDocumentRequestValueObject }
