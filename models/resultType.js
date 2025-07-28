const mongoose = require('mongoose');

const resultTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'resultTypes' });

const ResultTypeModel = mongoose.model('ResultType', resultTypeSchema);

module.exports = {
    ResultTypeModel
};
