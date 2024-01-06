const express = require('express')
const router = express.Router()
const statusController = require('../controllers/statusController');

// return all possible statuses
router.get('/', statusController.getStatuses)
  
module.exports = router