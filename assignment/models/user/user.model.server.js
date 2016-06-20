var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;


module.exports = function() {

    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findFacebookUser: findFacebookUser
    };
    return api;

    function findFacebookUser(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }
    
    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }
    
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }
    
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
    
    function updateUser(id, newUser) {
        return User.update(
            {_id: id},
            {$set :
                {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }
            }
        );
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};