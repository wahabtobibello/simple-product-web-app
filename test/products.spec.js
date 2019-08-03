const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const Chance = require('chance')
const mochaAsyncHelper = require('./helpers').mochaAsyncHelper

chai.use(chaiHttp)
chai.should()
const chance = Chance()

describe('Product', function () {
  describe('GET /product', function () {
    it('should return an array', mochaAsyncHelper(async function () {
      const res = await chai.request(app).get('/api/v1/product')
      res.should.have.status(200)
      res.body.data.should.be.an('array')
    }))
  })
  describe('GET /product/:id', function () {
    it('should return an object', mochaAsyncHelper(async function () {
      const { body: { data: products } } = await chai.request(app).
        get('/api/v1/product')
      const product = products[0]
      const res = await chai.request(app).get(`/api/v1/product/${product.id}`)
      res.should.have.status(200)
      res.body.data.should.be.an('object')
      res.body.data.id.should.eq(product.id)
    }))
    it('should return a 404', mochaAsyncHelper(async function () {
      const res = await chai.request(app).get('/api/v1/product/foo')
      res.should.have.status(404)
    }))
  })
})
