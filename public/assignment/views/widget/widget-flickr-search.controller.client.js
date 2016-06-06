(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($sce, $routeParams, $location, FlickrService, WidgetService) {
        var vm = this;
        var pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        var websiteId = $routeParams.wid;
        var widgetId = $routeParams.wgid;
        var userId = $routeParams.uid;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;

        function init() {
            vm.searchText = "";
            WidgetService
                .findWidgetById(widgetId)
                .then(function(res) {
                    vm.widget = res.data;
                });
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        vm.selectPhoto = function(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.widget.url = url;
            WidgetService
                .updateWidget(vm.widget)
                .then(function(res) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
                });
        }

        vm.searchPhotos = function(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                    console.log(vm.photos);
            });
        }
    }
})();