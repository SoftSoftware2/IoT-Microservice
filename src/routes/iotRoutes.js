const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iotController');

router.post('/gps', iotController.saveGpsData);
router.get('/gps/history', iotController.getHistory);
router.post('/actuator', iotController.controlActuator);

module.exports = router;