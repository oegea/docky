import { SubDocumentRepository } from '../repositories/SubDocumentRepository'
import { SubDocumentEntity } from '../../domain/entities/SubDocumentEntity'
import { GetSubDocumentService } from './GetSubDocumentService'

class DeleteSubDocumentService {
  private readonly subDocumentRepository: SubDocumentRepository
  private readonly getSubDocumentService: GetSubDocumentService

  constructor ({
    subDocumentRepository,
    getSubDocumentService
  }: {
    subDocumentRepository: SubDocumentRepository,
    getSubDocumentService: GetSubDocumentService
  }) {
    this.subDocumentRepository = subDocumentRepository
    this.getSubDocumentService = getSubDocumentService
  }

  public async execute ({
    subDocumentEntity
  }: {
    subDocumentEntity: SubDocumentEntity
  }): Promise<Boolean> {

    try {
        await this.getSubDocumentService.execute({subDocumentEntity})
    }
    catch(e){
        return false
    }

    const deleteResult = await this.subDocumentRepository.delete(subDocumentEntity)

    return deleteResult
  }
}

export { DeleteSubDocumentService }
