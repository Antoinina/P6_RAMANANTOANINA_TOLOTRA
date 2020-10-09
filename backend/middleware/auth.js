const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]; // Extract the token form the header
        const decodedToken = jwt.verify(token, 'dhegaifze56686deallj'); // Verify if the user id is the same as in the token
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID invalid !';
        } else{
            next();
        }
    } catch{
        res.status(401).json({
            error: new Error('Request impossible !')
        });
    }
};