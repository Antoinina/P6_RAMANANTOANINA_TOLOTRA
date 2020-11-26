const express = require('express'),
      router = express.Router();

const { body } = require('express-validator'); // To validate a conform email and a conform password

const userCtrl = require('../controllers/user');

router.post('/signup', [body('email').isEmail(), body('password').isLength({ min: 8} ).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)], userCtrl.signup); // Route when the customer signing with a content control
router.post('/login', userCtrl.login); // Route when the user logging

module.exports = router;