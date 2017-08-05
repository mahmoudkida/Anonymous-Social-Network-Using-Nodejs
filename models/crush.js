var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var msgModel = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    message: String,
    isAnonymous : {
        type: Boolean,
        default : true
    }
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
    msg: [msgModel],
    isAnonymous : {
        type: Boolean,
        default : true
    }
});
module.exports = mongoose.model('crush', crushModel);
