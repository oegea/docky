// Infrastructure
import {
  NativeEventBusRepository
} from 'passager-backend-shared-kernel'
// Service
import { GetOperationPermissionsService } from './GetOperationPermissionsService'

const getOperationPermissionsService = (): GetOperationPermissionsService => new GetOperationPermissionsService({
  eventBusRepository: new NativeEventBusRepository()
})

export {
  getOperationPermissionsService
}
