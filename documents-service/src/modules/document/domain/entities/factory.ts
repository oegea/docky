import { DocumentEntity } from './DocumentEntity'

const documentEntity = async({
    id,
    collection,
    documentPlainObject = {}
  }: {
    id: string,
    collection: string,
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

export { documentEntity }
