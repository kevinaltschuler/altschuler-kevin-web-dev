var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var WebsiteSchema = require("../website/website.schema.server.js")();

module.exports = function() {

    var UserSchema = new Schema();
    UserSchema.add({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{
            type: Schema.Types.ObjectId,
            ref: 'Website'
        }],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    });

    return UserSchema;
};
