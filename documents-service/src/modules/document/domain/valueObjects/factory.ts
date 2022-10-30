import { CreateDocumentRequestValueObject } from './CreateDocumentRequestValueObject'
import { GetDocumentRequestValueObject } from './GetDocumentRequestValueObject'

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

const getDocumentRequestValueObject = async({
  collection,
  id
}: {
  collection: string,
  id: string
}): Promise<GetDocumentRequestValueObject> => {
  const getDocumentRequestValueObject = new GetDocumentRequestValueObject({
    collection,
    id
  })

  return getDocumentRequestValueObject
}

export { createDocumentRequestValueObject, getDocumentRequestValueObject }
