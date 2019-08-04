var express = require('express')
const _ = require('lodash')
var router = express.Router()
const products = require('../models/products')

router.get('/product', function (req, res, next) {
  const payload = products.map(
    product => _.pick(product, ['id', 'name', 'price']))
  res.status(200).
    json({ data: payload, message: 'Products retrieved successfully' })
})

router.get('/product/:id', function (req, res, next) {
  const { id } = req.params
  const product = products.find(product => product.id === id)
  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }
  res.status(200).
    json({ data: product, message: 'Product retrieved successfully' })
})

module.exports = router
