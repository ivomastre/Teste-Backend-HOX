const jwt = require('jsonwebtoken')
const secret = require('../config/auth.config.js')

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization
  if (!bearerHeader) {
    return res.status(403).send({
      message: 'No Token provided!'
    })
  }

  const bearer = bearerHeader.split(' ')
  const bearerToken = bearer[1]
  jwt.verify(bearerToken, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      })
    }
  })
  next()
}

module.exports = verifyToken
