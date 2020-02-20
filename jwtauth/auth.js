const jwt = require('jsonwebtoken');
const logger = require('winston');
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
  

  const getUnauthorizedErrorMsg = () => {
    var err = new Error();
    err.name = "Unauthorized";
    err.message = "Unauthorized";
    return err;
  }

  
  module.exports = {
    auth,
    signToken,
  };
