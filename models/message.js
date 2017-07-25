var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageModel = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    created: Date,
    text: String
});
module.exports = mongoose.model('message', messageModel);
