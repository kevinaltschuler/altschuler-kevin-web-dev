var mongoose = require("mongoose");

module.exports = function() {

    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;
    
    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }
    
    function findPageById(pageId) {
        return Page.findById(pageId);
    }
    
    function updatePage(id, newPage) {
        return Page.update(
            {_id: id},
            {$set :
                {
                    name: newPage.name,
                    title: newPage.title,
                    description: newPage.description
                }
            }
        );
    }
    
    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }
};