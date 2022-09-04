import {BasicController} from '../../../basic/infrastructure/controllers/BasicController'

class StartLoginController extends BasicController {

    public async execute() {
        this.res.status(200).json({hello: 'world'})
    }

}

export {StartLoginController}