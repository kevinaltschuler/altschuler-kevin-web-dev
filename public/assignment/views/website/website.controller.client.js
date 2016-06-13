(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            WebsiteService
                .createWebsite(vm.userId, name, description)
                .then(function(res) {
                    console.log(res);
                    var newWebsite = res.data;
                    if(newWebsite) {
                        $location.url("/user/"+vm.userId+"/website");
                    } else {
                        vm.error = "Unable to create website";
                    }
                });
        }
    }

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function(res) {
                    vm.websites = res.data;
                });
        }
        init();
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.userId;
        var websiteId = $routeParams.websiteId;
        var deleteWebsite = deleteWebsite;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(websiteId)
                .then(function(res) {
                    vm.website = res.data;
                });
        }
        init();

        vm.updateWebsite = function(websiteId, website) {
            WebsiteService
                .updateWebsite(websiteId, website)
                .then(function(res) {
                    $location.url("/user/"+vm.userId+"/website");
                });
        }

        vm.deleteWebsite = function(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function(res) {
                   $location.url("/user/"+vm.userId+"/website"); 
                });
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function(res) {
                    var result = res.data;
                    if(result) {
                        $location.url("/user/"+vm.userId+"/website");
                    } else {
                        vm.error = "Unable to delete website";
                    }
                });
        }
    }
})();