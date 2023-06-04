import cors from 'cors'

export const expressEnableCorsMiddleware = (req, res, next) => {
    if (process.env.COMMON_DISABLE_CORS === 'false') {
        cors()(req, res, next)
    } else {
        next()
    }
}