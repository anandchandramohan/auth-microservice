var express = require('express');
const jwtAuth = require('../jwtauth/auth.js');
const router = express.Router();

var auth = require('../controllers/auth-controller');
var user = require('../controllers/user-controller');

router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.post('/register', auth.register);
router.get('/password/reset', auth.resetPassword);
router.post('/password/change',jwtAuth.auth, auth.changePassword);
router.get('/user', jwtAuth.auth, user.getUser);

module.exports = router;