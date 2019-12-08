const express = require('express');
const router = express.Router();
const RecommendController = require('../controllers/recommend');

router.get('/', RecommendController.detail);

module.exports = router;