var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postModel = new Schema({
    by: [userModel],
    circles: String,
    type: String,
    created: Date,
    text: String,
    comments: [commmentModel],
    hashtag: [hashtagModel]
});
module.exports = mongoose.model('post', postModel);
