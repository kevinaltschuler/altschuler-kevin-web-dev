var mongoose = require("mongoose");

module.exports = function() {

    var WidgetSchema = require("./widget.schema.server.js")();
    var Page = require("./../page/page.model.server.js");
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        uploadImage: uploadImage
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, newWidget) {
        return Widget.update({_id: widgetId}, 
            {
                $set : newWidget
            })
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function uploadImage(widgetId, filename) {
        return Widget.update({_id: widgetId},
            {
                $set: {
                    url: filename
                }
            });
    }

    function reorderWidget(pageId, start, end) {
        return Page.findById(pageId, function(err, page) {
            page.splice(end, 0, page.splice(start, 1)[0]);
        })
    }

};