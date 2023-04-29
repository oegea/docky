import {NativeEventBusRepository, TYPE_QUERY} from 'documents-service/dist'

const USER_FIELDS = ['displayName', 'email', 'initialized', 'photoURL', 'privateKey']
const eventBusRepository = new NativeEventBusRepository()
export const createDocument = async (currentResult: boolean, payloadObject: any) => {
    const {
        collection,
        currentUserId,
        payload
    } = payloadObject

    if (collection !== 'users')
        return currentResult

    if (payload.email !== currentUserId) {
        console.log('Trying to create a user with a different email than the authorized session')
        return false
    }

    // Check that it has the expected fields: Iterate payload keys
    const receivedFields = Object.keys(payload)
    const hasAllFields = USER_FIELDS.every((field) => receivedFields.includes(field))
    if (!hasAllFields) {
        console.log('Trying to create a user with missing fields')
        return false
    }

    // Check if user already exists and if so, return false
    const existingDocuments = await eventBusRepository.query('FIND_DOCUMENT', {
        collection,
        criteria: {
            email: currentUserId
        }
    })

    if (Array.isArray(existingDocuments) && existingDocuments[0]?.length > 0) {
        console.log('Trying to create a user that already exists')
        return false
    }

    return true
}

export const deleteDocument = (result: boolean, payloadObject: object) => {
    /*const {
        collection,
        currentUserId,
        id,
        payload
    } = payloadObject*/
    return result
}

export const findDocument = (result: boolean, payloadObject: object) => {
    /*const {
        collection,
        currentUserId,
        id,
        payload
    } = payloadObject*/
    return false
}

export const getDocument = (result: boolean, payloadObject: object) => {
    /*const {
        collection,
        currentUserId,
        id,
        payload
    } = payloadObject*/
    return false
}