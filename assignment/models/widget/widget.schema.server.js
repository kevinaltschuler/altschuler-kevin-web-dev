var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    var WidgetSchema = new Schema();
    WidgetSchema.add({
        _page: {
            type: Schema.Types.ObjectId,
            ref: "Page"
        },
        widgetType: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name      : String,
        placeholder: String,
        description: String,
        text: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {
            type: Date, 
            default: Date.now
        }
    });
    return WidgetSchema;
}