const jwtAuth = require('../jwtauth/auth.js');
const User = require('../model/user.js');
var user = {};

user.getUser = (req, res, next) => {
  jwtAuth.auth(req,res,next);
  console.log(req);
    var id = req.decoded.id;
    User.findById(id)
      .then((user) => {
        res.json({
          success: true,
          item: user,
        });
      })
      .catch((error) => {
        next(new Error(error));
      });
  };

module.exports = user;