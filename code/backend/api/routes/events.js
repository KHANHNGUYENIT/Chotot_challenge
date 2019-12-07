const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const EventController = require('../controllers/events');

router.post('/create', EventController.create_a_event);
router.get('/listAll', EventController.list_all_events)
router.get('/', EventController.read_a_event)
router.put('/', EventController.update_a_event)
router.delete('/', EventController.delete_a_event);

module.exports =router;