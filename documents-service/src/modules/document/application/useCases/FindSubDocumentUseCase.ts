import { FindSubDocumentRequestValueObject } from '../../domain/valueObjects/FindSubDocumentRequestValueObject'
import { FindSubDocumentService } from '../../domain/services/FindSubDocumentService'

class FindSubDocumentUseCase {
  private readonly findSubDocumentRequestValueObject: ({ 
        collection, 
        parentId,
        subCollection,
        criteria 
    }: {
        collection: string,
        parentId: string,
        subCollection: string,
        criteria: object
    }) => Promise<FindSubDocumentRequestValueObject>
  private readonly findSubDocumentService: FindSubDocumentService

  constructor ({
    findSubDocumentRequestValueObject,
    findSubDocumentService
  }: {
    findSubDocumentRequestValueObject: ({ 
        collection, 
        parentId,
        subCollection,
        criteria 
    }: {
        collection: string,
        parentId: string,
        subCollection: string,
        criteria: object
    }) => Promise<FindSubDocumentRequestValueObject>
    findSubDocumentService: FindSubDocumentService
  }) {
    this.findSubDocumentRequestValueObject = findSubDocumentRequestValueObject
    this.findSubDocumentService = findSubDocumentService
  }

  public async execute ({ 
    collection, 
    parentId,
    subCollection,
    criteria 
}: {
    collection: string,
    parentId: string,
    subCollection: string,
    criteria: object
}): Promise<object> {
    try {
      const findSubDocumentRequestValueObject = await this.findSubDocumentRequestValueObject({ 
        collection,
        parentId,
        subCollection,
        criteria 
      })
      const subDocumentEntityResult =  await this.findSubDocumentService.execute({ findSubDocumentRequestValueObject })
      return subDocumentEntityResult.toJson()
    } catch (e) {
      throw e.message
    }
  }
}

export { FindSubDocumentUseCase }
