// Infrastructure
import {
  NativeEventBusRepository
} from '@useful-tools/docky-shared-kernel'
// Service
import { GetOperationPermissionsService } from './GetOperationPermissionsService'

const getOperationPermissionsService = (): GetOperationPermissionsService => new GetOperationPermissionsService({
  eventBusRepository: new NativeEventBusRepository()
})

export {
  getOperationPermissionsService
}
