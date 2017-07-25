var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var userModel = new Schema({
    name: String,
    created: Date,
    age: Number,
    bio: String,
    location: String,
    interests: [String],
    picture: String,
    coverPicture: String
});
userModel.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userModel);
