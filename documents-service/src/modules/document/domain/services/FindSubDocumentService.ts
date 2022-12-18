import { FindSubDocumentRequestValueObject } from '../valueObjects/FindSubDocumentRequestValueObject'
import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { SubDocumentEntityListValueObject } from '../../domain/valueObjects/SubDocumentEntityListValueObject'

class FindSubDocumentService {
  private readonly subDocumentRepository: SubDocumentRepository

  constructor ({
    subDocumentRepository
  }: {
    subDocumentRepository: SubDocumentRepository
  }) {
    this.subDocumentRepository = subDocumentRepository
  }

  public async execute ({
    findSubDocumentRequestValueObject
  }: {
    findSubDocumentRequestValueObject: FindSubDocumentRequestValueObject
  }): Promise<SubDocumentEntityListValueObject> {

    const findResult = await this.subDocumentRepository.find(findSubDocumentRequestValueObject)

    if (findResult === null)
        throw new Error('FindSubDocumentService: error while finding documents')

    return findResult
  }
}

export { FindSubDocumentService }
