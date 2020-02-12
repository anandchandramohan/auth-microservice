var express = require('express');
const router = express.Router();

var auth = require('../controllers/auth-controller');

router.get('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/register', auth.register);
router.get('/password/reset', auth.resetPassword);
router.get('/password/change', auth.changePassword);

module.exports = router;