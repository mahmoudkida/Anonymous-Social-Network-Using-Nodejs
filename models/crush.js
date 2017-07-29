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
var crushModel = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    text: String
});
module.exports = mongoose.model('crush', crushModel);
