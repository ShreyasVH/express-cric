const mongoose = require('mongoose');

const extrasTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'extrasTypes' });

const ExtrasTypeModel = mongoose.model('ExtrasType', extrasTypeSchema);

module.exports = {
    ExtrasTypeModel
};
