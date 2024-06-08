const express = require('express');
const carEntriesController = require('../controllers/carEntriesController');

const router = express.Router();

router.post('/entry', carEntriesController.addEntry);
router.post('/exit', carEntriesController.addExit);

module.exports = router;