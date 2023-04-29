import {start, NativeEventBusRepository, TYPE_QUERY} from 'documents-service/dist'
import { createDocument as createUserDocument } from './users'

const eventBusRepository = new NativeEventBusRepository()
const onGetOperationPermissions = async (type: string, name: string, payloadObject: any) => {
    const {
        operationType
    } = payloadObject
    let result = false
    switch(operationType){
        case 'create_document':
            result = await createUserDocument(result, payloadObject)
            break
        
        case 'create_subdocument':
            break
        
        case 'delete_document':
            break
        
        case 'delete_subdocument':
            break

        case 'find_document':
            break
        
        case 'find_subdocument':
            break

        case 'get_document':
            break

        case 'get_subdocument':
            break

        case 'patch_document':
            break

        case 'patch_subdocument':
            break
    }

    return result
}

eventBusRepository.subscribe(TYPE_QUERY, 'GET_OPERATION_PERMISSIONS', onGetOperationPermissions)
start()