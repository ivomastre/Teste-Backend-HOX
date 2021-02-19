const request = require('supertest')
const db = require('../database')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const app = require('../')
describe('Test the Product Endpoints', () => {
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

  it('Should be able to access Index with token', async () => {
    const response = await request(app).get('/product').set('authorization', `bearer ${token}`)
    expect(response.status).toBe(200)
  })
  it('Shouldn`t be able to access Index without a token', async () => {
    const response = await request(app).get('/product')
    expect(response.status).toBe(403)
  })
  it('Shouldn`t be able to access Index with a invalid token', async () => {
    const response = await request(app).get('/product').set('authorization', 'teste')
    expect(response.status).toBe(401)
  })
  it('Should be able to post', async () => {
    const response = await request(app).post('/product').send({
      name: 'teste',
      CategoryId: null,
      manufacturingDate: '2021-02-19T00:10:08.000Z',
      perishableProduct: true,
      expirationDate: '2021-02-19T00:10:08.000Z',
      price: 100.50
    }).set('authorization', `bearer ${token}`)
    expect(response.status).toBe(200)
  })
  it('Should`n be able to post with manufacturing date higher than expiration date', async () => {
    const response = await request(app).post('/product').send({
      name: 'teste',
      CategoryId: null,
      manufacturingDate: '2022-02-19T00:10:08.000Z',
      perishableProduct: true,
      expirationDate: '2021-02-19T00:10:08.000Z',
      price: 100.50
    }).set('authorization', `bearer ${token}`)
    expect(response.status).toBe(400)
  })
  it('Should be able to post with a valid CategoryId', async () => {
    await request(app).post('/category').send({
      name: 'teste'
    }).set('authorization', `bearer ${token}`)
    const response = await request(app).post('/product').send({
      name: 'teste',
      CategoryId: 1,
      manufacturingDate: '2021-02-19T00:10:08.000Z',
      perishableProduct: true,
      expirationDate: '2021-02-19T00:10:08.000Z',
      price: 100.50
    }).set('authorization', `bearer ${token}`)
    expect(response.status).toBe(200)
  })
  it('Should`n be able to post with a invalid CategoryId', async () => {
    const response = await request(app).post('/product').send({
      name: 'teste',
      CategoryId: 1,
      manufacturingDate: '2021-02-19T00:10:08.000Z',
      perishableProduct: true,
      expirationDate: '2021-02-19T00:10:08.000Z',
      price: 100.50
    }).set('authorization', `bearer ${token}`)
    expect(response.status).toBe(400)
  })

  it('Should be able to delete', async () => {
    const response = await request(app).delete('/product/1').set('authorization', `bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('Should be able to update', async () => {
    await request(app).post('/product').send({
      name: 'teste'
    }).set('authorization', `bearer ${token}`)
    const response = await request(app).put('/product/1').send({
      name: 'teste2'
    }).set('authorization', `bearer ${token}`)
    expect(response.status).toBe(200)
    console.log(response.body)
    expect(response.body.updatedProduct.name).toBe('teste2')
  })

  it('Shouldn`t be able to update with manufacturing date higher than expiration date', async () => {
    await request(app).post('/product').send({
      name: 'teste'
    }).set('authorization', `bearer ${token}`)
    const response = await request(app).put('/product/1').send({
      name: 'teste2',
      manufacturingDate: '2022-02-19T00:10:08.000Z',
      expirationDate: '2021-02-19T00:10:08.000Z'
    }).set('authorization', `bearer ${token}`)
    expect(response.status).toBe(400)
  })
})
