import jwt from 'jsonwebtoken'

export const expressValidateTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  const defaultNonLoggedUser = {
    email: null
  }

  if (token == null) {
    req.user = defaultNonLoggedUser
    next()
    return
  }

  jwt.verify(token, process.env.COMMON_TOKEN_SECRET as string, (err: any, user: any) => {

    if (err) req.user = defaultNonLoggedUser
    else req.user = user

    next()
  })
}