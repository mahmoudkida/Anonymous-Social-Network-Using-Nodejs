var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var hashtagModel = new Schema({
    hashtagId: Schema.Types.ObjectId,
    hashtagName: String
});
module.exports = mongoose.model('hashtag', hashtagModel);
