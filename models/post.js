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
    hashtag: [{
        type: Schema.Types.ObjectId,
        ref: 'hashtag'
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('post', postModel);
