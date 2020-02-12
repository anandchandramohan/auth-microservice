import userService from '../services/userService';
var userController = {};
userController.getUser = async function (req, res) {
    //userService.getUser();
     res.send({"message": "got user"});
}

export default userController; 