(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.id;

        function init() {
            UserService
                .findUserById(id)
                .then(function(res) {
                    vm.user = res.data;
                });
        }
        init();

        function updateUser(newUser, userId) {
            UserService
                .updateUser(newUser, userId)
                .then(function(res) {
                    vm.user.firstName = newUser.firstName;
                    vm.user.lastName = newUser.lastName;
                });
        }
    }

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = function(username, password) {
            UserService
                .findUserByUsernameAndPassword(username, password)
                .then(function(response){
                    var user = response.data;
                    if(user._id) {
                        $location.url("/profile/" + user._id);
                    } else {
                        vm.error = "User not found";
                    }
            });
        }

        vm.register = function(username, password) {
            var id = (new Date()).getTime()+"";
            UserService
                .createUser({username: username, password: password, _id: id})
                .then(function(res) {
                   $location.url("/profile/"+id); 
                });
        }

    }
})();