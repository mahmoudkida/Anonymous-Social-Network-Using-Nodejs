var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commmentModel = new Schema({
    by: [userModel],
    created: Date,
    text: String
});
module.exports = mongoose.model('commment', commmentModel);
