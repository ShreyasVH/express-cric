const mongoose = require('mongoose');

const seriesTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'seriesTypes' });

const SeriesTypeModel = mongoose.model('SeriesType', seriesTypeSchema);

module.exports = {
    SeriesTypeModel
};
