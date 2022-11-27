import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'

class GetSubDocumentService {
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

    const getSubDocumentResult = await this.subDocumentRepository.get(subDocumentEntity)

    if (getSubDocumentResult === null)
        throw new Error('GetSubDocumentService: error while getting a document')

    return getSubDocumentResult
  }
}

export { GetSubDocumentService }
