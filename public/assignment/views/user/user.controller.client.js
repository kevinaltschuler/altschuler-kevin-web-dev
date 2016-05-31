(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        vm.userId = $routeParams["userId"];
        function init() {
                vm.user = UserService.findUserById(vm.userId);
        }
        init();

        var id = $routeParams.id;
        var index = -1;
        for(var i in users) {
            if(users[i]._id === id) {
                vm.user = users[i];
                index = i;
            }
        }

        function updateUser(newUser) {
            console.log(newUser);
            users[index].firstName = newUser.firstName;
            users[index].lastName = newUser.lastName;
        }
    }

    function LoginController($location) {
        var vm = this;

        vm.login = function(username, password) {
            var currentUser = null;
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    currentUser = users[i];
                    $location.url("/profile/"+users[i]._id);
                    break;
                } else {
                    vm.error = "User not found";
                }
            }
        }

    }
})();