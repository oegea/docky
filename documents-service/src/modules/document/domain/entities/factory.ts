import { DocumentEntity } from './DocumentEntity'
import { SubDocumentEntity } from './SubDocumentEntity'

const documentEntity = async ({
  id,
  collection,
  documentPlainObject = {}
}: {
  id: string
  collection: string
  documentPlainObject: object
}): Promise<DocumentEntity> => {
  const documentEntity = new DocumentEntity({
    id,
    collection,
    documentPlainObject
  })

  await documentEntity.validate()

  return documentEntity
}

const subDocumentEntity = async ({
  collection,
  documentPlainObject = {},
  id,
  parentId,
  subCollection
}: {
  collection: string
  documentPlainObject: object
  id: string
  parentId: string
  subCollection: string
}): Promise<SubDocumentEntity> => {
  const subDocumentEntity = new SubDocumentEntity({
    id,
    collection,
    documentPlainObject,
    parentId,
    subCollection
  })

  await subDocumentEntity.validate()

  return subDocumentEntity
}

export { documentEntity, subDocumentEntity }
