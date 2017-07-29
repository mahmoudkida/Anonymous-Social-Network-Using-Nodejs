var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var userModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    anonymousName: String,
    OauthId: String,
    OauthToken: String,
    age: Number,
    bio: String,
    location: String,
    interests: [String],
    picture: String,
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
userModel.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userModel);
