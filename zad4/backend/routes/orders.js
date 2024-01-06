const express = require('express')
const router = express.Router()
const orderController = require('../controllers/ordersController');

// return all orders
router.get('/', orderController.getOrders)

// add new order
router.post('/', orderController.createOrder)

// change order status with given id
router.put('/:id', orderController.updateOrder)

// return orders with given status
router.get('/status/:id', orderController.getOrdersbyStatus)
  
module.exports = router