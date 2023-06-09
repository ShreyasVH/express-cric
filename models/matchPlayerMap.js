const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const matchPlayerMapSchema = new mongoose.Schema({
    _id: { type: Number },
    matchId: { type: Number, required: true },
    playerId: { type: Number, required: true },
    teamId: { type: Number, required: true }
}, { collection: 'matchPlayerMap' });

matchPlayerMapSchema.pre('save', async function (next) {
    const matchPlayerMap = this;
    try {
        const counter = await CounterModel.findByIdAndUpdate(
            'matchPlayerMap',
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        matchPlayerMap._id = counter.sequenceValue;
        next();
    } catch (error) {
        console.error('Failed to generate matchPlayerMap ID:', error);
        throw error;
    }
});

const MatchPlayerMapModel = mongoose.model('MatchPlayerMap', matchPlayerMapSchema);

class MatchPlayerMap {
    constructor(matchId, playerId, teamId) {
        this.matchId = matchId;
        this.playerId = playerId;
        this.teamId = teamId;
    }
}

module.exports = {
    MatchPlayerMapModel,
    MatchPlayerMap
};
