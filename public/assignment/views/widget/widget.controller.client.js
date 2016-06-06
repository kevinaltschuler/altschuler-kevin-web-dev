(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;

        function init() {
            WidgetService
                .findWidgetsByPageId(pageId)
                .then(function(res) {
                    vm.widgets = res.data;
                });

        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }

        $(".widget-container")
            .sortable({axis: "y"});
    }

    function NewWidgetController($location, $sce, $routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;

        function init() {
            WidgetService
                .findWidgetsByPageId(pageId)
                .then(function(res) {
                    vm.widgets = res.data;
                });
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }

        vm.createWidget = function(pageId, type) {
            var wgId = (new Date()).getTime()+"";
            WidgetService
                .createWidget(pageId, { "_id": wgId, "widgetType": type, "pageId": pageId})
                .then(function(res) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+res.data._id);
                });
        }
    }

    function EditWidgetController($location, $sce, $routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        var widgetId = $routeParams.wgid;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;
        vm.widgetId = widgetId;

        function init() {
            WidgetService
                .findWidgetById(widgetId)
                .then(function(res) {
                    vm.widget = res.data;
                    console.log(vm.widget);
                });
        }
        init();

        vm.updateWidget = function(widget) {
            WidgetService
                .updateWidget(widget)
                .then(function(res) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                });
        }

        vm.deleteWidget = function(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(function(res) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                });
        } 


        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }
    }
})();