const jwtAuth = require('../jwtauth/auth.js');
const User = require('../model/user.js');
var auth = {};
auth.isEmail = function(value) {
  if(value && value.indexOf("@")>=0) {
    return true;
  }
  return false;
}

auth.login = function (req, res, next) {
      var body = req.body;
      var userName = body.userName;
      var password = body.password;
      var query = {};
      if(auth.isEmail(userName)) {
        query.primaryEmail = userName;
      } else {
        query.userName = userName;
      }
      
      var primaryEmail = body.primaryEmail;
      var password = body.password;
      User.findOne(query)
        .exec()
        .then((user) => {
          var err = new Error();
          err.name = "Unauthorized";
          err.message = "Incorrect username or password.";
          if(!user) {
            return next(err);
          } 
          if(!user.verifyPassword(password)) {
            return next(err);
          }
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
        }).catch((error) => {
          next(new Error(error));
        });
  };  

auth.register =  function (req, res, next) {
    var body = req.body;
    const user = new User(body);          
    user.save()
    .then((created) => {
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
};

auth.resetPassword =  function (req, res, next) {
  
};

auth.changePassword =  function (req, res, next) {
  var id = req.decoded.id;
  var newPassword = req.body.newPassword;
  var oldPassword = req.body.oldPassword;
  if(newPassword == null || newPassword == undefined || newPassword.length == 0 
    || oldPassword == null || oldPassword == undefined || oldPassword.length == 0) {
      next(new Error("Invalid new passsword/ old password"));
  }
  User.findById(id)
      .then((user) => {
        if(!user.verifyPassword(oldPassword)) {
          return next(new Error("Old password isn't valid"));
        }
        user.password = newPassword;
        user.save()
          .then((updatedUser)=> {
          res.json({
            success: true,
            item : "Password changed successfully"
          })
        }).catch((error) => {
          next(new Error(error));
        })
      })
  }
  auth.requestPasswordToken = function(req, res, next) {
    var email = req.body.email;
    if(!auth.isEmail(email)) {
      return next(new Error("Ivalid email addresss."));
    }
    var query = {"primaryEmail": email};
    User.findOne(query)
        .exec()
        .then((user) => {
          if(!user) {
            var err = new Error();
              err.name = "Not Found";
              err.message = "User is not exist";
              return next(err);
          }
          user.generatePasswordReset();
          user.save()
          .then((updatedUser)=> {
            res.json({
              success: true,
              item : "The token request has been done."
            })
          }).catch((error) => {
             next(new Error(error));
          })  
    });
  };
    
auth.logout = function (req, res) {
    //authService.logout();
     res.json({"message": "logged out"});
};  

module.exports = auth; 