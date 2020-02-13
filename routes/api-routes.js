var express = require('express');
const router = express.Router();

var auth = require('../controllers/auth-controller');
var user = require('../controllers/user-controller');

router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.post('/register', auth.register);
router.get('/password/reset', auth.resetPassword);
router.get('/password/change', auth.changePassword);
router.get('/user', user.getUser);

module.exports = router;