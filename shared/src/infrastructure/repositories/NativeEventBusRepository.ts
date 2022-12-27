import { EventBusRepository, TYPE_COMMAND, TYPE_QUERY } from "../../domain/repositories/EventBusRepository";

class NativeEventBusRepository implements EventBusRepository {

    // Store subscription on an abstract property
    static subscriptions: Array<{
         type: string,
         name: string,
         callback: (type: string, name: string, payload: any) => any
    }>

    command (command: string, payload: any): Promise<any> {
        // Find all subscriptions
        const subscriptions = NativeEventBusRepository.subscriptions.filter(subscription => {
            return subscription.type === TYPE_COMMAND && subscription.name === command
        })

        // Execute all callbacks
        subscriptions.forEach(subscription => {
            subscription.callback(TYPE_COMMAND, command, payload)
        })

        // Return a resolved promise
        return Promise.resolve()
    }
    async query (query: string, payload: any): Promise<any> {
        // Find all subscriptions
        const subscriptions = NativeEventBusRepository.subscriptions.filter(subscription => {
            return subscription.type === TYPE_QUERY && subscription.name === query
        })

        // Return null if no subscriptions are found
        if (subscriptions.length === 0) {
            return null
        }

        // Execute all callbacks and store the results after awaiting the callback
        const results = await Promise.all(subscriptions.map(subscription => {
            return subscription.callback(TYPE_QUERY, query, payload)
        }))

        // Return all results
        return results
    }

    subscribe (type: string, name: string, callback: (type: string, name: string, payload: any) => any): void {
        // Add to subscriptions
        NativeEventBusRepository.subscriptions.push({
            type,
            name,
            callback
        })
    }
    unsubscribe (type: string, name: string, callback: (type: string, name: string, payload: any) => any): void {
        // Remove from subscriptions
        NativeEventBusRepository.subscriptions = NativeEventBusRepository.subscriptions.filter(subscription => {
            return subscription.type !== type && subscription.name !== name && subscription.callback !== callback
        })
    }
}

export { NativeEventBusRepository }