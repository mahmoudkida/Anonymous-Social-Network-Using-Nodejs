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
        required: true,
        select: false
    },
    anonymousName: {
        type:String,
        default : 'Anonymous Wshwsher'
    },
    OauthId: String,
    OauthToken: String,
    age: Number,
    bio: {
        type:String,
        default : ''
    },
    email:String,
    location: String,
    interests: [String],
    picture: {
        type: String,
        default : ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    lastLoginDate : {
        type: Date,
        default : new Date()
    }
}, {
    timestamps: true
});
userModel.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userModel);
