const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router.get('/', carController.getAllCars);
router.post('/register', carController.register);

module.exports = router;