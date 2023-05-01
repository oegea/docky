import {start, NativeEventBusRepository, TYPE_QUERY} from 'documents-service/dist'
import { 
    createDocument as createUserDocument,
    deleteDocument as deleteUserDocument,
    findDocument as findUserDocument,
    getDocument as getUserDocument,
    patchDocument as patchUserDocument
} from './users'

import {
    createDocument as createSharingSettingsDocument,
    deleteDocument as deleteSharingSettingsDocument,
    findDocument as findSharingSettingsDocument,
    getDocument as getSharingSettingsDocument,
    patchDocument as patchSharingSettingsDocument
} from './userSharingSettings'

const eventBusRepository = new NativeEventBusRepository()
const onGetOperationPermissions = async (type: string, name: string, payloadObject: any) => {
    try {
        const {
            operationType
        } = payloadObject
        
        const result = await hasPermissions(operationType, payloadObject)
        return result

    } catch (error) {
        console.error(error)
        return false
    }
}

const hasPermissions = async (operationType: string, payloadObject: any) => {
    let result = false
    switch(operationType){
        case 'create_document':
            result = await createUserDocument(result, payloadObject)
            result = await createSharingSettingsDocument(result, payloadObject)
            break
        
        case 'create_subdocument':
            break
        
        case 'delete_document':
            result = await deleteUserDocument(result, payloadObject)
            result = await deleteSharingSettingsDocument(result, payloadObject)
            break
        
        case 'delete_subdocument':
            break

        case 'find_document':
            result = await findUserDocument(result, payloadObject)
            result = await findSharingSettingsDocument(result, payloadObject)
            break
        
        case 'find_subdocument':
            break

        case 'get_document':
            result = await getUserDocument(result, payloadObject)
            result = await getSharingSettingsDocument(result, payloadObject)
            break

        case 'get_subdocument':
            break

        case 'patch_document':
            result = await patchUserDocument(result, payloadObject)
            result = await patchSharingSettingsDocument(result, payloadObject)
            break

        case 'patch_subdocument':
            break
    }
    return result
}

eventBusRepository.subscribe(TYPE_QUERY, 'GET_OPERATION_PERMISSIONS', onGetOperationPermissions)
start()