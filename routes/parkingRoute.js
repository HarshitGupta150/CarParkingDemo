const express = require('express');
const parkingController = require('../controllers/parkingController');

const router = express.Router();

router.get('/space', parkingController.getAvailableSpace);
router.post('/space', parkingController.addTotalSpace);

module.exports = router;