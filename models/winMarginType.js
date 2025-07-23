const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const winMarginTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'winMarginTypes' });

// winMarginTypeSchema.pre('save', async function (next) {
//     const winMarginType = this;
//     try {
//         const counter = await CounterModel.findByIdAndUpdate(
//             'winMarginTypes',
//             { $inc: { sequenceValue: 1 } },
//             { new: true, upsert: true }
//         );
//         winMarginType._id = counter.sequenceValue;
//         next();
//     } catch (error) {
//         console.error('Failed to generate win margin type ID:', error);
//         throw error;
//     }
// });

const WinMarginTypeModel = mongoose.model('WinMarginType', winMarginTypeSchema);

module.exports = {
    WinMarginTypeModel
};
