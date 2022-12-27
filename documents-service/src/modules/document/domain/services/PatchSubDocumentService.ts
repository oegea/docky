import { SubDocumentEntity } from '../entities/SubDocumentEntity'
import { SubDocumentRepository } from '../repositories/SubDocumentRepository'

class PatchSubDocumentService {
  private readonly subDocumentRepository: SubDocumentRepository

  constructor ({
    subDocumentRepository
  }: {
    subDocumentRepository: SubDocumentRepository
  }) {
    this.subDocumentRepository = subDocumentRepository
  }

  public async execute ({
    subDocumentEntity
  }: {
    subDocumentEntity: SubDocumentEntity
  }): Promise<SubDocumentEntity> {

    const documentUpdateResult = await this.subDocumentRepository.patch(subDocumentEntity)

    if (documentUpdateResult === null)
        throw new Error('PatchSubDocumentService: error while patching a sub document')

    return documentUpdateResult
  }
}

export { PatchSubDocumentService }
