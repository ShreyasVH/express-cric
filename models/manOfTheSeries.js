const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const manOfTheSeriesSchema = new mongoose.Schema({
    _id: { type: Number },
    seriesId: { type: Number, required: true },
    playerId: { type: Number, required: true }
},  { collection: 'manOfTheSeries' });

manOfTheSeriesSchema.pre('save', async function (next) {
    const manOfTheSeries = this;
    try {
        const counter = await CounterModel.findByIdAndUpdate(
            'manOfTheSeries',
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        manOfTheSeries._id = counter.sequenceValue;
        next();
    } catch (error) {
        console.error('Failed to generate MOTS ID:', error);
        throw error;
    }
});

const ManOfTheSeriesModel = mongoose.model('ManOfTheSeries', manOfTheSeriesSchema);

class ManOfTheSeries {
    constructor (seriesId, playerId) {
        this.seriesId = seriesId;
        this.playerId = playerId;
    }
}

module.exports = {
    ManOfTheSeriesModel,
    ManOfTheSeries
};
