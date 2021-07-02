
var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/UserController')
router.post('/signin', AuthController.signin )
router.post('/signup', AuthController.signup )

module.exports = router;
