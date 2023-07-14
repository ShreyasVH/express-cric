const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const dismissalModeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'dismissalModes' });

dismissalModeSchema.pre('save', async function (next) {
    const dismissalMode = this;
    try {
        const counter = await CounterModel.findByIdAndUpdate(
            'dismissalMode',
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        dismissalMode._id = counter.sequenceValue;
        next();
    } catch (error) {
        console.error('Failed to generate dismissal mode ID:', error);
        throw error;
    }
});

const DismissalModeModel = mongoose.model('DismissalMode', dismissalModeSchema);

module.exports = {
    DismissalModeModel
};
