var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PageSchema = require("./../page/page.schema.server.js")();
var Page = require("./../page/page.model.server.js");

module.exports = function() {
	var WebsiteSchema = new Schema();
    WebsiteSchema.add({
        _user: { type: String, ref: 'User' },
        name : String,
        description : String,
        pages: [{
    	    type: Schema.Types.ObjectId,
    	    ref: "Page"
    	}],
        dateCreated : {type : Date, default: Date.now}
    });

    return WebsiteSchema;
};