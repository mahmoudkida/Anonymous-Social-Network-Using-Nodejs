var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var msgModel = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    message: String
}, {
    timestamps: true
});
var messageModel = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    msg: [msgModel]
});
module.exports = mongoose.model('message', messageModel);
