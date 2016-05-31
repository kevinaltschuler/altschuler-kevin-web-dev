(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            var newWebsite = WebsiteService.createWebsite(vm.userId, name, description);
            if(newWebsite) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to create website";
            }
        }
    }

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.userId;
        var websiteId = $routeParams.websiteId;
        var deleteWebsite = deleteWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
            console.log(websiteId);
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.deleteWebsite = deleteWebsite;
        }
        init();

        vm.updateWebsite = function(websiteId, website) {
            WebsiteService.updateWebsite(websiteId, website);
            $location.url("/user/"+vm.userId+"/website");
        }

        vm.deleteWebsite = function(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            $location.url("/user/"+vm.userId+"/website");
        }

        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();