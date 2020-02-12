var auth = {};

auth.login =  async function (req, res) {
    //authService.login();
     res.json({"message": "logged in"});
}

auth.register =  function (req, res) {
    //authService.register();
     res.json({"message": "registered"});
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