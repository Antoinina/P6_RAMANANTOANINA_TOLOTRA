const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const { validationResult } = require('express-validator'); // Check the validity the from fields and reports all errors

const maskEmailOptions = {
    maskWith: 'X',
    unmaskedStartCharacters: 2,
    maskAtTheRate: false,
    maxMaskedCharactersBeforeAtTheRate: 15,
    maxMaskedCharactersAfterAtTheRate: 15
};


/* Create user */
exports.signup = (req, res, next) => {
    const maskedEmail = MaskData.maskEmail2(req.body.email, maskEmailOptions);
    
    // To store all errors during signing
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    bcrypt.hash(req.body.password, 10) // Saler the password 10 times
        .then(hash => {
            const user = new User({
                email: maskedEmail,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User created !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    const maskedEmail = MaskData.maskEmail2(req.body.email, maskEmailOptions);
    User.findOne({ email: maskedEmail })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'User not found !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Password not valid !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( // Encode a new token to permit to the user to connect just once during 24h
                            { userId: user._id },
                            'dhegaifze56686deallj',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};