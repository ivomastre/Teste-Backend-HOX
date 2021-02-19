const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secret = require('../config/auth.config.js')
const User = require('../models/user.js')

module.exports = {
  async register (req, res) {
    const { name, email, password } = req.body
    const userResponse = await User.create(
      {
        name, email, password: bcrypt.hashSync(password, 8)
      }
    )

    return res.json(userResponse)
  },

  async login (req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).send({ message: 'Email or password not provided.' })
    }
    const userResponse = await User.findOne({
      where: { email }
    })
    if (!userResponse) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    const passwordIsValid = bcrypt.compareSync(
      password,
      userResponse.password
    )
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      })
    }

    const token = jwt.sign({ id: userResponse.id }, secret, {
      expiresIn: 86400 // 24 hours
    })

    return res.status(200).send({
      id: userResponse.id,
      name: userResponse.name,
      email: userResponse.email,
      token
    })
  }
}
