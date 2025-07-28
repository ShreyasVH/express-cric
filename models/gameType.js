const mongoose = require('mongoose');

const gameTypeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'gameTypes' });

const GameTypeModel = mongoose.model('GameType', gameTypeSchema);

module.exports = {
    GameTypeModel
};
