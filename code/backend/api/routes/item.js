const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item');

router.get('/', ItemController.item);


module.exports = router;