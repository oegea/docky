import { SubDocumentEntity } from '../entities/SubDocumentEntity'
import { SubDocumentEntityListValueObject } from '../valueObjects/SubDocumentEntityListValueObject'
import { FindSubDocumentRequestValueObject } from '../valueObjects/FindSubDocumentRequestValueObject'

interface SubDocumentRepository {
  create: (subDocumentEntity: SubDocumentEntity) => Promise<SubDocumentEntity>
  get: (SubDocumentEntity: SubDocumentEntity) => Promise<SubDocumentEntity>
  delete: (SubDocumentEntity: SubDocumentEntity) => Promise<Boolean>
  find: (findSubDocumentRequestValueObject: FindSubDocumentRequestValueObject) => Promise<SubDocumentEntityListValueObject>
}
export { SubDocumentRepository }
