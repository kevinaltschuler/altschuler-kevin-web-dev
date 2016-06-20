(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.websiteId = websiteId;
        vm.userId = userId;

        function init() {
            PageService
                .findPageByWebsiteId(websiteId)
                .then(function(res){
                    vm.pages = res.data;
                })
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
        vm.websiteId = websiteId;
        vm.userId = userId;

        function init() {
            PageService
                .findPageByWebsiteId(websiteId)
                .then(function(res){
                    vm.pages = res.data;
                })

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
            var page = {_website: websiteId, name: name};
            if(page.name)
                PageService
                    .createPage(websiteId, page)
                    .then(function(res){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    });
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        var pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;

        function init() {
            PageService
                .findPageById(pageId)
                .then(function(res) {
                    vm.page = res.data;
                });
        }
        init();

        vm.updatePage = function(pageId, page) {
            if(page.name)
                PageService
                    .updatePage(pageId, page)
                    .then(function(res){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    });
        }

        vm.deletePage = function(pageId) {
            PageService
                .deletePage(pageId)
                .then(function(res) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
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