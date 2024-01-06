const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/categoriesController')

// return all categories
router.get('/', categoryController.getCategories)
  
module.exports = router