const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item');

router.get('/', ItemController.item);
router.get('/detail',ItemController.item_detail);

module.exports = router;