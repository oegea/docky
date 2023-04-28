import {start, NativeEventBusRepository, TYPE_QUERY} from 'documents-service/dist'

const eventBusRepository = new NativeEventBusRepository()
const onGetOperationPermissions = async (type: string, name: string, payload: string) => {
    /*const {
        collection,
        id,
        subCollection, parentId,
        operationType,
        payload
    } = payload*/
    console.log('onGetOperationPermissions', type, name, payload)
    return false
}

eventBusRepository.subscribe(TYPE_QUERY, 'GET_OPERATION_PERMISSIONS', onGetOperationPermissions)

start()