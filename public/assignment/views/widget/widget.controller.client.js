(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "1234", "widgetType": "HEADER", "pageId": "333", "size": 2, "text": "GIZMODO"},
        { "_id": "2344", "widgetType": "HEADER", "pageId": "333", "size": 4, "text": "Lorem ipsum"},
        { "_id": "3454", "widgetType": "IMAGE", "pageId": "333", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "4564", "widgetType": "HTML", "pageId": "333", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "5674", "widgetType": "HEADER", "pageId": "333", "size": 4, "text": "Lorem ipsum"},
        { "_id": "6784", "widgetType": "YOUTUBE", "pageId": "333", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "7894", "widgetType": "HTML", "pageId": "333", "text": "<p>Lorem ipsum</p>"}
    ];

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(pageId);
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.pageId = pageId;
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
    }

    function NewWidgetController($location, $sce, $routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(pageId);
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.pageId = pageId;
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
            console.log(type);
            WidgetService.createWidget(pageId, { "_id": wgId, "widgetType": type, "pageId": pageId});
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+wgId);
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

        function init() {
            vm.widget = WidgetService.findWidgetById(widgetId);
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.pageId = pageId;
            vm.widgetId = widgetId;
            console.log(vm.widgetId);
        }
        init();

        vm.updateWidget = function(widget) {
            WidgetService.updateWidget(widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
        }

        vm.deleteWidget = function(widgetId) {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
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