const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const seriesTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'seriesTypes' });

seriesTypeSchema.pre('save', async function (next) {
    const seriesType = this;
    try {
        const counter = await CounterModel.findByIdAndUpdate(
            'seriesTypes',
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        seriesType._id = counter.sequenceValue;
        next();
    } catch (error) {
        console.error('Failed to generate series type ID:', error);
        throw error;
    }
});

const SeriesTypeModel = mongoose.model('SeriesType', seriesTypeSchema);

module.exports = {
    SeriesTypeModel
};
