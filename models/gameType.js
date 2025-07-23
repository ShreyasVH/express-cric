const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const gameTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'gameTypes' });

// gameTypeSchema.pre('save', async function (next) {
//     const gameType = this;
//     try {
//         const counter = await CounterModel.findByIdAndUpdate(
//             'gameTypes',
//             { $inc: { sequenceValue: 1 } },
//             { new: true, upsert: true }
//         );
//         gameType._id = counter.sequenceValue;
//         next();
//     } catch (error) {
//         console.error('Failed to generate game type ID:', error);
//         throw error;
//     }
// });

const GameTypeModel = mongoose.model('GameType', gameTypeSchema);

module.exports = {
    GameTypeModel
};
