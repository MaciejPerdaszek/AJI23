const express = require('express')
const router = express.Router()
const productController = require('../controllers/productsController');

// return all products
router.get('/', productController.getProducts)

// return product with given id
router.get('/:id', productController.getProductById)

// add new product
router.post('/', productController.addProduct)

// update product with given id
router.put('/:id', productController.updateProduct)
  
module.exports = router