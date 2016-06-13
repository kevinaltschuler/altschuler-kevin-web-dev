var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var WidgetSchema = require("../widget/widget.schema.server.js")();
var Website = require("./../website/website.model.server.js");
var Widget = require("./../widget/widget.model.server.js");

module.exports = function() {
    var PageSchema = new Schema();
    PageSchema.add({
    	_website: { 
    		type: Schema.Types.ObjectId, 
    		ref: 'Website' 
    	},
        name: String,
        title: String,
        description: String,
        widgets: [{
    	    type: Schema.Types.ObjectId,
    	    ref: 'Widget'
    	}],
        dateCreated: {
        	type: Date, 
        	default: Date.now
        }
    });
    return PageSchema;
}