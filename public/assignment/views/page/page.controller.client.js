(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    var pages = [
      { "_id": "321", "name": "Post 1", "websiteId": "456" },
      { "_id": "432", "name": "Post 2", "websiteId": "456" },
      { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    function PageListController($routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(websiteId);
            vm.websiteId = websiteId;
            vm.userId = userId;
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(websiteId);
            vm.websiteId = websiteId;
            vm.userId = userId;
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(url);
        }

        vm.createPage = function(websiteId, name) {
            var page = {name: name, _id: (new Date()).getTime()+""}
            PageService.createPage(websiteId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        var pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
            vm.page = PageService.findPageById(pageId);
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.pageId = pageId;
        }
        init();

        vm.updatePage = function(pageId, page) {
            console.log(page)
            PageService.updatePage(pageId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        vm.deletePage = function(pageId) {
            PageService.deletePage(pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(url);
        }
    }
})();