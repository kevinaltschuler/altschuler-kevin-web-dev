module.exports = function() {

    var express    = require('express');        
    var app        = express();                 
    var mongoose   = require('mongoose');

    var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;

    // if OPENSHIFT env variables are present, use the available connection info:
    if (process.env.OPENSHIFT_MONGODB_DB_URL) {
        url = process.env.OPENSHIFT_MONGODB_DB_URL +
        process.env.OPENSHIFT_APP_NAME;
    }

    // Connect to mongodb
    var connect = function () {
        mongoose.createConnection(url);
    };
    connect();

    var db = mongoose.connection;

    db.on('error', function(error){
        console.log("Error loading the db - "+ error);
    });

    db.on('disconnected', connect);
    
    var pageModel = require("./page/page.model.server.js")();
    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();

    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    return models;
};