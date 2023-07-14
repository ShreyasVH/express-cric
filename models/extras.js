const mongoose = require('mongoose');

const { configureAutoIncrement } = require('./baseModel');

const extrasSchema = new mongoose.Schema({
    _id: { type: Number },
    matchId: { type: Number, required: true },
    typeId: { type: Number, required: true },
    runs: { type: Number, required: true },
    battingTeamId: { type: Number, required: true },
    bowlingTeamId: { type: Number, required: true },
    innings: { type: Number, required: true }
},  { collection: 'extras' });

configureAutoIncrement(extrasSchema, 'extras');

const ExtrasModel = mongoose.model('Extras', extrasSchema);

class Extras {
    constructor (matchId, extrasRequest) {
        this.matchId = matchId;
        this.typeId = extrasRequest.typeId;
        this.runs = extrasRequest.runs;
        this.battingTeamId = extrasRequest.battingTeamId;
        this.bowlingTeamId = extrasRequest.bowlingTeamId;
        this.innings = extrasRequest.innings;
    }
}

module.exports = {
    ExtrasModel,
    Extras
};
