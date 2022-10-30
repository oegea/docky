import { CreateDocumentRequestValueObject } from './CreateDocumentRequestValueObject'

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

export { createDocumentRequestValueObject }
