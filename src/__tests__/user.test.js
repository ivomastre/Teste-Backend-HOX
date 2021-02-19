const request = require('supertest')
const db = require('../database')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const app = require('../')
describe('Test the Category Endpoints', () => {
  beforeEach(async () => {
    await db.sync({ force: true })
    await User.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: bcrypt.hashSync('123', 8)
    })
  })

  it('Should be able to login', async () => {
    const response = await request(app).post('/login').send({
      email: 'teste@teste.com',
      password: '123'
    })
    expect(response.status).toBe(200)
  })
  it('Shouldn`t be able to login with wrong email', async () => {
    const response = await request(app).post('/login').send({
      email: 'teste2@teste.com',
      password: '123'
    })
    expect(response.status).toBe(404)
  })
  it('Shouldn`t be able to login with wrong password', async () => {
    const response = await request(app).post('/login').send({
      email: 'teste@teste.com',
      password: '1234'
    })
    expect(response.status).toBe(401)
  })
  it('Should be able to register', async () => {
    const response = await request(app).post('/register').send({
      email: 'teste2@teste.com',
      password: '123',
      name: 'teste'
    })
    expect(response.status).toBe(200)
  })
  it('Should`n be able to register with duplicated email', async () => {
    const response = await request(app).post('/register').send({
      email: 'teste@teste.com',
      password: '123',
      name: 'teste'
    })
    expect(response.status).toBe(400)
  })
})
