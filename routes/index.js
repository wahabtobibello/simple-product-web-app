var express = require('express')
var router = express.Router()
var multer = require('multer')
const uuid = require('uuid/v4')
const products = require('../models/products')

var upload = multer({ storage: multer.memoryStorage() })
/* GET home page. */
router.route('/').get(function (req, res) {
  res.render('index')
}).post(upload.single('image'), function (req, res, next) {
  const { name, description, price, color, category } = req.body
  const image = {
    contentType: req.file.mimetype,
    buffer: req.file.buffer,
  }
  const product = {
    id: uuid(),
    name,
    description,
    price: `$ ${price}`,
    category,
    image,
    color,
  }
  products.push(product)
  res.redirect(`/product/${product.id}`)
})

router.route('/product/:id').get(function (req, res) {
  const { id } = req.params
  res.render('product',
    { product: products.find(product => product.id === id) })
})
module.exports = router
