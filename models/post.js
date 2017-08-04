var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commmentModel = new Schema({
    comment: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    isAnonymous : {
        type: Boolean,
        default : true
    }
}, {
    timestamps: true
});

var postModel = new Schema({
    by: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    circles: String,
    type: String,
    text: String,
    comments: [commmentModel],
    like:{
        type:Number,
        default : 0
    },
    dislike:{
        type:Number,
        default : 0
    },
    hashtag: [{
        type: Schema.Types.ObjectId,
        ref: 'hashtag'
    }],
    isAnonymous : {
        type: Boolean,
        default : true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('post', postModel);
