// Domain
import { documentEntity } from '../../domain/entities/factory'
// Mappers
import { FromMongoDBDocumentToDocumentEntityMapper } from './FromMongoDBDocumentToDocumentEntityMapper'

const fromMongoDBDocumentToDocumentEntityMapper = ({
    collection,
    documentPlainObject
}: {
    collection: string,
    documentPlainObject: object
}) => new FromMongoDBDocumentToDocumentEntityMapper({collection, documentEntity, documentPlainObject})

export { fromMongoDBDocumentToDocumentEntityMapper }
