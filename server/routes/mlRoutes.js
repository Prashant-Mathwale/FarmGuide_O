const express = require('express');
const router = express.Router();
const { getCropRecommendation, detectDisease } = require('../controllers/mlController');
const { protect } = require('../middleware/auth');

router.post('/crop-recommendation', protect, getCropRecommendation);
router.post('/disease-detect', protect, detectDisease);

module.exports = router;
