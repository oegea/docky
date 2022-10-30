// Domain
import { DocumentRepository } from '../../domain/repositories/DocumentRepository'
// Infrastructure repositories
import { MongoDBDocumentRepository } from './MongoDBDocumentRepository'
// Infraestructure mappers
import { fromMongoDBDocumentToDocumentEntityMapper } from '../mapper/factory'

const documentRepository = (): DocumentRepository => new MongoDBDocumentRepository({
    fromMongoDBDocumentToDocumentEntityMapper
})

export { 
    documentRepository
}
