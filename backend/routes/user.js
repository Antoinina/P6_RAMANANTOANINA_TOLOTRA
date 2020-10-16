const express = require('express'),
      router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Route when the customer signing
router.post('/login', userCtrl.login); // Route when the user logging

module.exports = router;