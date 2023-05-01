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

export const deleteDocument = async (currentResult: boolean, payloadObject: any) => {
    const {
        collection
    } = payloadObject

    if (collection !== 'users')
        return currentResult

    return false
}

export const findDocument = async (currentResult: boolean, payloadObject: any) => {
    const {
        collection,
        currentUserId,
        payload
    } = payloadObject

    if (collection !== 'users')
        return currentResult

    if (payload.email !== currentUserId) 
        return false

    return true
}

export const getDocument = async (currentResult: boolean, payloadObject: any) => {
    const {
        collection,
        currentUserId,
        id
    } = payloadObject

    if (collection !== 'users')
        return currentResult

    // Check if it is our user
    const existingDocument = await eventBusRepository.query('GET_DOCUMENT', {
        collection,
        id
    })
    if (existingDocument[0]?.email !== currentUserId)
        return false

    return true
}

export const patchDocument = async (currentResult: boolean, payloadObject: any) => {
    const {
        collection,
        currentUserId,
        id,
        payload
    } = payloadObject

    if (collection !== 'users')
        return currentResult

    // Check if it is our user
    const existingDocument = await eventBusRepository.query('GET_DOCUMENT', {
        collection,
        id
    })

    if (existingDocument[0]?.email !== currentUserId)
        return false

    if (payload.email !== currentUserId) 
        return false

    return true
}