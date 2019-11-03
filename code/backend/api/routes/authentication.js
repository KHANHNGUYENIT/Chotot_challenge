const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const AuthenticationController = require('../controllers/authentication');

router.post('/login', AuthenticationController.login);

router.all('/logout', checkAuth , AuthenticationController.logout);

router.get('/check-if-logged-in', checkAuth, AuthenticationController.checkIfLoggedIn);


module.exports = router;