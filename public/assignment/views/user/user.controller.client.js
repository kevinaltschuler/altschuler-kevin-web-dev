(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.id;

        function init() {
            vm.user = $rootScope.currentUser;
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

    function LoginController($location, UserService, $rootScope) {
        var vm = this;

        vm.login = function(username, password) {
            UserService
                .login({username: username, password: password})
                .then(function(response){
                    var user = response.data;
                    $rootScope.currentUser = user;
                    console.log(user);
                    if(user && user._id) {
                        $location.url("/profile/" + user._id);
                    } else {
                        vm.error = "User not found";
                    }
            });
        }

        vm.register = function(username, password) {
            UserService
            .register({username: username, password: password})
            .then(
                function(response) {
                    var user = response.data;
                    $rootScope.currentUser = user;
                    $location.url("/user/"+user._id);
                }
            );
        }

        vm.logout = function() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    }
                );
        }

    }
})();