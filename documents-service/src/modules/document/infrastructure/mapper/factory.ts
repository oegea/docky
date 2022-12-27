// Domain
import { documentEntity, subDocumentEntity } from '../../domain/entities/factory'
// Mappers
import { FromMongoDBDocumentToDocumentEntityMapper } from './FromMongoDBDocumentToDocumentEntityMapper'
import { FromMongoDBSubDocumentToSubDocumentEntityMapper } from './FromMongoDBSubDocumentToSubDocumentEntityMapper'
import { FromMongoDBFindToDocumentEntityListMapper } from './FromMongoDBFindToDocumentEntityListMapper'
import { FromMongoDBFindToSubDocumentEntityListMapper } from './FromMongoDBFindToSubDocumentEntityListMapper'

const fromMongoDBDocumentToDocumentEntityMapper = ({
    collection,
    documentPlainObject
}: {
    collection: string,
    documentPlainObject: object
}) => new FromMongoDBDocumentToDocumentEntityMapper({collection, documentEntity, documentPlainObject})

const fromMongoDBSubDocumentToSubDocumentEntityMapper = ({
    collection,
    documentPlainObject,
    parentId,
    subCollection
}: {
    collection: string,
    documentPlainObject: object,
    parentId: string,
    subCollection: string
}) => new FromMongoDBSubDocumentToSubDocumentEntityMapper({
    collection,
    documentPlainObject,
    parentId,
    subCollection,
    subDocumentEntity
})

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

const fromMongoDBFindToSubDocumentEntityListMapper = ({
    collection,
    parentId,
    subCollection,
    mongoDBFindResult
} : {
    collection: string,
    parentId: string,
    subCollection: string,
    mongoDBFindResult : Array<object>
}) => new FromMongoDBFindToSubDocumentEntityListMapper({
    collection,
    parentId,
    subCollection,
    mongoDBFindResult,
    fromMongoDBSubDocumentToSubDocumentEntityMapper
})

export { fromMongoDBDocumentToDocumentEntityMapper, fromMongoDBSubDocumentToSubDocumentEntityMapper, fromMongoDBFindToDocumentEntityListMapper, fromMongoDBFindToSubDocumentEntityListMapper }
