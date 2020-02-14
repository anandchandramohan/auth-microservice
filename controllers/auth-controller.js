const jwtAuth = require('../jwtauth/auth.js');
const User = require('../model/user.js');
var auth = {};

auth.login = function (req, res, next) {
      var body = req.body;
      var email = body.email;
      var password = body.password;
      User.findOne({email})
        .exec()
        .then((user) => {
          if (user && user.verifyPassword(password)) {
            const token = jwtAuth.signToken({
              id: user.id,
            });
            res.json({
              success: true,
              item: user,
              meta: {
                token,
              },
            });
          } else {
            next();
          }
        })
        .catch((error) => {
          next(new Error(error));
        });
}   

auth.register =  function (req, res, next) {
    var body = req.body;
    console.log(body);
    const user = new User(body);
    console.log(user);
          
    user.save()
    .then((created) => {
      console.log("User created successfully");
      const token = jwtAuth.signToken({
        id: created.id,
      });

      res.json({
        success: true,
        item: created,
        meta: {
          token,
        },
      });
    })
    .catch((error) => {
      next(new Error(error));
    });
}

auth.resetPassword =  function (req, res) {
    //authService.resetPassword();
     res.json({"message": "password reset successfully"});
}

auth.changePassword =  function (req, res) {
    //authService.changePassword();
     res.json({"message": "changed password"});
}
    
auth.logout = function (req, res) {
    //authService.logout();
     res.json({"message": "logged out"});
}  

module.exports = auth; 