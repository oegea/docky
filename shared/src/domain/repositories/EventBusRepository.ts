interface EventBusRepository {
  command (command: string, payload: any): Promise<any>
  query (query: string, payload: any): Promise<any>
  subscribe (type: string, name: string, callback: (type: string, name: string, payload: any) => any): void
  unsubscribe (type: string, name: string, callback: (type: string, name: string, payload: any) => any): void
}

const TYPE_COMMAND = 'command'
const TYPE_QUERY = 'query'

export { EventBusRepository, TYPE_COMMAND, TYPE_QUERY }
