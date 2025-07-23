const mongoose = require('mongoose');

const { configureAutoIncrement } = require('./baseModel');

const extrasTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'extrasTypes' });

// configureAutoIncrement(extrasTypeSchema, 'extrasTypes');

const ExtrasTypeModel = mongoose.model('ExtrasType', extrasTypeSchema);

module.exports = {
    ExtrasTypeModel
};
