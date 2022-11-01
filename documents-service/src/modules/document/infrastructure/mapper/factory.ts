// Domain
import { documentEntity } from '../../domain/entities/factory'
// Mappers
import { FromMongoDBDocumentToDocumentEntityMapper } from './FromMongoDBDocumentToDocumentEntityMapper'
import { FromMongoDBFindToDocumentEntityListMapper } from './FromMongoDBFindToDocumentEntityListMapper'

const fromMongoDBDocumentToDocumentEntityMapper = ({
    collection,
    documentPlainObject
}: {
    collection: string,
    documentPlainObject: object
}) => new FromMongoDBDocumentToDocumentEntityMapper({collection, documentEntity, documentPlainObject})

const fromMongoDBFindToDocumentEntityListMapper = ({
    collection,
    mongoDBFindResult
} : {
    collection: string,
    mongoDBFindResult : any
}) => new FromMongoDBFindToDocumentEntityListMapper({
    collection,
    mongoDBFindResult,
    fromMongoDBDocumentToDocumentEntityMapper
})

export { fromMongoDBDocumentToDocumentEntityMapper, fromMongoDBFindToDocumentEntityListMapper }
