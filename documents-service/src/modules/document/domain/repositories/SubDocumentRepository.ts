import { SubDocumentEntity } from '../entities/SubDocumentEntity'

interface SubDocumentRepository {
  create: (subDocumentEntity: SubDocumentEntity) => Promise<SubDocumentEntity>
  get: (SubDocumentEntity: SubDocumentEntity) => Promise<SubDocumentEntity>
}
export { SubDocumentRepository }
