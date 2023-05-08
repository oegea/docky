import jwt from 'jsonwebtoken'

export const expressValidateTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.COMMON_TOKEN_SECRET as string, (err: any, user: any) => {

    if (err) req.user = null
    else req.user = user

    next()
  })
}