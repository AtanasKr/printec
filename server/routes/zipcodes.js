const express = require('express');
const router = express.Router();
const zipcodesController = require('../controllers/zipcodesController');

router.get('/data', zipcodesController.getAllData);
router.get('/:country/:code', zipcodesController.getZipData);

module.exports = router;