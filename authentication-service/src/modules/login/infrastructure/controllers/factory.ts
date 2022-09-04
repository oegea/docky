import {StartLoginController} from "./StartLoginController"

class LoginControllersFactory {
    static startLoginController(req, res) {
        return new StartLoginController(req, res)
    }
}

export {LoginControllersFactory}