// Domain
import { DocumentRepository } from '../../domain/repositories/DocumentRepository'
import { SubDocumentRepository } from '../../domain/repositories/SubDocumentRepository'
// Infrastructure repositories
import { MongoDBDocumentRepository } from './MongoDBDocumentRepository'
import { MongoDBSubDocumentRepository } from './MongoDBSubDocumentRepository'
// Infraestructure mappers
import { fromMongoDBDocumentToDocumentEntityMapper, fromMongoDBFindToDocumentEntityListMapper } from '../mapper/factory'

const documentRepository = (): DocumentRepository => new MongoDBDocumentRepository({
    fromMongoDBDocumentToDocumentEntityMapper,
    fromMongoDBFindToDocumentEntityListMapper
})

const subDocumentRepository = (): SubDocumentRepository => new MongoDBSubDocumentRepository()

export { 
    documentRepository,
    subDocumentRepository
}
