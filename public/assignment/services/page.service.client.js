(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
      { "_id": "321", "name": "Post 1", "websiteId": "456" },
      { "_id": "432", "name": "Post 2", "websiteId": "456" },
      { "_id": "543", "name": "Post 3", "websiteId": "456" },
      { "_id": "333", "name": "Post 4", "websiteId": "567"}
    ];

    function PageService() {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }
        
        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for(var i in pages) {
                if(pages[i].websiteId === websiteId) {
                    resultSet.push(pages[i]);
                }
            }
            return resultSet;
        }

        function findPageById(pageId) {
            return _.find(pages, function(page){ return page._id == pageId; });
        }

        function updatePage(pageId, $page) {
            var page = _.find(pages, function(page){ return page._id == pageId; });
            page.name = $page.name;
        }

        function deletePage(pageId) {
            pages = _.reject(pages, function($page){ return $page._id == pageId; });
        }
    }
})();