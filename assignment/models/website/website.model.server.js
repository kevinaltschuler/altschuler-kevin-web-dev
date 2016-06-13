var mongoose = require("mongoose");

module.exports = function() {

    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findWebsiteById(websiteId) {
        return Website.findOne({_id: websiteId});
    }

    function updateWebsite(websiteId, newWebsite) {
        return Website.update({_id: websiteId}, 
            {$set :
                {
                    name: newWebsite.name,
                    description: newWebsite.description
                }
            })
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

};