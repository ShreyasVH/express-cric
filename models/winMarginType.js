const mongoose = require('mongoose');

const winMarginTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'winMarginTypes' });

const WinMarginTypeModel = mongoose.model('WinMarginType', winMarginTypeSchema);

module.exports = {
    WinMarginTypeModel
};
