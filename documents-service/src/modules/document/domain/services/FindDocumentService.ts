import { FindDocumentRequestValueObject } from '../valueObjects/FindDocumentRequestValueObject'
import { DocumentRepository } from '../repositories/DocumentRepository'
import { DocumentEntityListValueObject } from '../../domain/valueObjects/DocumentEntityListValueObject'
import { GetOperationPermissionsService } from '../../../permissions/domain/services/GetOperationPermissionsService'

class FindDocumentService {
  private readonly documentRepository: DocumentRepository
  private readonly getOperationPermissionsService: GetOperationPermissionsService

  constructor ({
    documentRepository,
    getOperationPermissionsService
  }: {
    documentRepository: DocumentRepository,
    getOperationPermissionsService: GetOperationPermissionsService
  }) {
    this.documentRepository = documentRepository
    this.getOperationPermissionsService = getOperationPermissionsService
  }

  public async execute ({
    findDocumentRequestValueObject
  }: {
    findDocumentRequestValueObject: FindDocumentRequestValueObject
  }): Promise<DocumentEntityListValueObject> {

    const hasPermission = await this.getOperationPermissionsService.execute()
    if (!hasPermission)
      throw new Error('FindDocumentService: insufficient permissions to perform this operation')

    const findResult = await this.documentRepository.find(findDocumentRequestValueObject)

    if (findResult === null)
        throw new Error('FindDocumentService: error while finding documents')

    return findResult
  }
}

export { FindDocumentService }
