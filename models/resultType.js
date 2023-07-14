const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const resultTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'resultTypes' });

resultTypeSchema.pre('save', async function (next) {
    const resultType = this;
    try {
        const counter = await CounterModel.findByIdAndUpdate(
            'resultTypes',
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        resultType._id = counter.sequenceValue;
        next();
    } catch (error) {
        console.error('Failed to generate result type ID:', error);
        throw error;
    }
});

const ResultTypeModel = mongoose.model('ResultType', resultTypeSchema);

module.exports = {
    ResultTypeModel
};
