const jwt = require('jsonwebtoken');
const config = {
    secret: "secret"
};

const auth = (req, res, next) => {
    var authCode = req.headers.authorization;
    var error = getUnauthorizedErrorMsg();
    if(authCode == null || authCode == undefined || authCode.length == 0) {
       return next(error);
    } 
    var token = authCode.split(" ");
    if(token.length !== 2) {
      return next(error);
    }
    var token = token[1];
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          var error = getUnauthorizedErrorMsg();
          next(error);
        } else {
          req.decoded = decoded;
          next();
        } 
      });
    };
  
  const signToken = (payload, expiresIn = '1h') => jwt.sign(payload, config.secret, {
    algorithm: 'HS256',
    expiresIn,
  });
  
  module.exports = {
    auth,
    signToken,
  };
