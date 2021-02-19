const request = require('supertest')
const db = require('../database')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const app = require('../')
describe('Test the Category Endpoints', () => {
  let token
  beforeEach(async () => {
    await db.sync({ force: true })
    await User.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: bcrypt.hashSync('123', 8)
    })
    const response = await request(app).post('/login').send({
      email: 'teste@teste.com',
      password: '123'
    })
    token = response.body.token
  })

  it('Should be able to index', async () => {
    const response = await request(app).get('/category').set('authorization', `bearer ${token}`)

    expect(response.status).toBe(200)
  })
  it('Should be able to access Show', async () => {
    await request(app).post('/category').set('authorization', `bearer ${token}`).send({ name: 'teste' })
    const response = await request(app).get('/category/1').set('authorization', `bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('teste')
  })
  it('Shouldn`t be able to access Show with a invalid id', async () => {
    const response = await request(app).get('/category/2').set('authorization', `bearer ${token}`)
    expect(response.status).toBe(404)
  })
  it('Should be able to store', async () => {
    const response = await request(app).post('/category').set('authorization', `bearer ${token}`).send({ name: 'teste' })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('teste')
  })
  it('Should be able to delete', async () => {
    await request(app).post('/category').set('authorization', `bearer ${token}`).send({ name: 'teste' })
    const response = await request(app).delete('/category/1').set('authorization', `bearer ${token}`)

    expect(response.status).toBe(200)
  })
  it('Should be able to update', async () => {
    await request(app).post('/category').set('authorization', `bearer ${token}`).send({ name: 'teste' })
    const response = await request(app).put('/category/1').set('authorization', `bearer ${token}`).send({ name: 'teste2' })

    expect(response.status).toBe(200)
    expect(response.body.updatedCategory.name).toBe('teste2')
  })
})
