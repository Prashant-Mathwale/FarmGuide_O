const express = require('express');
const router = express.Router();
const { getMarketPrices } = require('../controllers/marketController');
const { protect } = require('../middleware/auth');

router.get('/prices', protect, getMarketPrices);

module.exports = router;
