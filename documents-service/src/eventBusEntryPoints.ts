import {
  createDocumentController,
  createSubDocumentController,
  deleteDocumentController,
  deleteSubDocumentController,
  getDocumentController,
  getSubDocumentController,
  findDocumentController,
  findSubDocumentController,
  patchDocumentController,
  patchSubDocumentController
} from './modules/document/infrastructure/controllers/factory'

import {
  NativeEventBusRepository,
  TYPE_QUERY
} from '@useful-tools/docky-shared-kernel'

export const setupEventEntryPoints = async () => {
  const nativeEventBusRepository = new NativeEventBusRepository()

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'CREATE_DOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await createDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.document)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'CREATE_SUBDOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await createSubDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.parentId, payloadObject.subCollection, payloadObject.document)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'DELETE_DOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await deleteDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.id)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'DELETE_SUBDOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await deleteSubDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.parentId, payloadObject.subCollection, payloadObject.id)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'FIND_DOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await findDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.criteria)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'FIND_SUBDOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await findSubDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.parentId, payloadObject.subCollection, payloadObject.criteria)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'GET_DOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await getDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.id)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'GET_SUBDOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await getSubDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.parentId, payloadObject.subCollection, payloadObject.id)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'PATCH_DOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await patchDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.id, payloadObject.document)
    return result
  })

  nativeEventBusRepository.subscribe(TYPE_QUERY, 'PATCH_SUBDOCUMENT', async (type: string, name: string, payloadObject: any) => {
    const result = await patchSubDocumentController(null, null).internalExecute(payloadObject.collection, payloadObject.parentId, payloadObject.subCollection, payloadObject.id, payloadObject.document)
    return result
  })
}
