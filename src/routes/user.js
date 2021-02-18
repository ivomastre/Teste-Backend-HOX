var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')
const { checkDuplicateEmail } = require('../middleware/verifySignUp')


router.post('/register', checkDuplicateEmail,UserController.register)
router.post('/login', UserController.login)
module.exports = router;
