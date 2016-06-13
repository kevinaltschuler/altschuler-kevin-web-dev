(function(){
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable)

    function wamSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find("widget-container")
                .sortable({
                    start: function(event, ui) {
                        console.log("sorting began");
                        startIndex = ui.item.index();
                        console.log(startIndex);
                    },
                    stop: function (event, ui) {
                        console.log("sorting stopped");
                        endIndex = ui.item.index();
                        console.log(endIndex);

                        var sortedElement = scope.data.splice(startIndex, 1)[0];
                        scope.data.splice(endIndex, 0, sortedElement);

                        scope.$apply();

                        // scope.$parent.model.sorted(startIndex, endIndex);
                        scope.reorder({start: startIndex, end: endIndex});
                    }
                });
        }
        return {
            templateUrl: "./directives/wam-sortable.html",
            scope: {
                userId: "=",
                websiteId: "=",
                pageId: "=",
                widgetId: "=",
                widgetType: "=",
                widgetSize: "=",
                widgetText: "=",
                widgetUrl: "=",
                widgetWidth: "=",
                getSafeUrl: "&",
                getSafeHtml: "&",
                widget: "="
            },
            link: linker
        }
    }

})();