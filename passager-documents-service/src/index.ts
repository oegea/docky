import {start, NativeEventBusRepository, TYPE_QUERY} from 'documents-service/dist'

const eventBusRepository = new NativeEventBusRepository()
const onGetOperationPermissions = async (type: string, name: string, payload: string) => {
    return false
}

eventBusRepository.subscribe(TYPE_QUERY, 'GET_OPERATION_PERMISSIONS', onGetOperationPermissions)

start()