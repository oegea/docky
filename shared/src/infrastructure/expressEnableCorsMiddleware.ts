import cors from 'cors'

export const expressEnableCorsMiddleware = (req, res, next) => {
    
    if (process.env.COMMON_DISABLE_CORS === 'false') {

        (process.env.NODE_ENV === 'development') && console.log('CORS is enabled')

        cors()(req, res, next)
    } else {

        (process.env.NODE_ENV === 'development') && console.log('CORS is disabled')

        next()
    }
}