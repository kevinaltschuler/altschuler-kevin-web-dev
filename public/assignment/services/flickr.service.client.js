(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "dab782e0e382c6fdb5d490d58f6cd0ef";
    var secret = "141af22037a5ea55";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http, WidgetService) {
        var api = {
            searchPhotos: searchPhotos,
        };
        return api;
        
        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();