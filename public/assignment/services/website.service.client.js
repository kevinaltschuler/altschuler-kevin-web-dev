(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite

        };
        return api;

        function deleteWebsite(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.delete(url);
        }
        
        function createWebsite(developerId, name, desc) {
            var website = {
                developerId: developerId,
                name: name
            };
            return $http.post("/api/user/"+developerId+"/website", website);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/"+websiteId;
            return $http.put(url, website);
        }
    }
})();