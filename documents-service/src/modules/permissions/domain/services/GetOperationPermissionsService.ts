import { 
    EventBusRepository, NativeEventBusRepository
} from 'passager-backend-shared-kernel'

class GetOperationPermissionsService {

  private eventBusRepository: EventBusRepository

  constructor ({
    eventBusRepository
  }: {
    eventBusRepository: EventBusRepository
  }) {
    this.eventBusRepository = eventBusRepository
  }

  public async execute (): Promise<Boolean> {

    const hasPermissions =  await this.eventBusRepository.query(
      'GET_OPERATION_PERMISSIONS', {}
    )

    if (hasPermissions === null)
      return false
    
    return hasPermissions[0]
  }
}

export { GetOperationPermissionsService }
