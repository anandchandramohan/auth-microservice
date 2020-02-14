const jwt = require('jsonwebtoken');
const logger = require('winston');
const config = {
    secret: "secret"
};

const auth = (req, res, next) => {
  console.log("Entered auth");
    const token = req.body.token || req.query.token || req.headers.authorization;
    console.log("Token");
    console.log(token);
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          const message = 'Unauthorized';
          logger.warn(message);
          res.status(401);
          res.json({
            success: false,
            message,
          });
        } else {
          console.log("DECODING");
          console.log(decoded);
          req.decoded = decoded;
          next();
        }
      });
    } else {
      const message = 'Forbidden';
      logger.warn(message);
      res.status(403);
      res.json({
        success: false,
        message,
      });
    }
  };
  
  const signToken = (payload, expiresIn = '1h') => jwt.sign(payload, config.secret, {
    algorithm: 'HS256',
    expiresIn,
  });
  
  const authFailed = (req, res, next) => {
    res.json({
      success: auth
    });
  }

  
  module.exports = {
    auth,
    authFailed,
    signToken,
  };
