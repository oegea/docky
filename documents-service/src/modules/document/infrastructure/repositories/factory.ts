// Domain
import { DocumentRepository } from '../../domain/repositories/DocumentRepository'
// Infrastructure repositories
import { MongoDBDocumentRepository } from './MongoDBDocumentRepository'

const documentRepository = (): DocumentRepository => new MongoDBDocumentRepository()

export { 
    documentRepository
}
