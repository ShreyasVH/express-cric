const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const bowlingFigureSchema = new mongoose.Schema({
    _id: { type: Number },
    playerId: { type: Number, required: true },
    teamId: { type: Number, required: true },
    matchId: { type: Number, required: true },
    balls: { type: Number, required: true },
    maidens: { type: Number, required: true },
    runs: { type: Number, required: true },
    wickets: { type: Number, required: true },
    innings: { type: Number, required: true },
    isOfficialMatch: { type: Boolean, required: true},
    gameTypeId: { type: Number, required: true },
    teamType: { type: Object, require: true }
}, { collection: 'bowlingFigures' });

bowlingFigureSchema.pre('save', async function (next) {
    const bowlingFigure = this;
    try {
        const counter = await CounterModel.findByIdAndUpdate(
            'bowlingFigures',
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        bowlingFigure._id = counter.sequenceValue;
        next();
    } catch (error) {
        console.error('Failed to generate bowling figure ID:', error);
        throw error;
    }
});

const BowlingFigureModel = mongoose.model('BowlingFigure', bowlingFigureSchema);

class BowlingFigure {
    constructor(createRequest, playerTeamMap, match, gameTypeId, teamMap, teamTypeMap) {
        this.playerId = createRequest.playerId;
        this.teamId = playerTeamMap[createRequest.playerId];
        this.matchId = match.id;
        this.balls = createRequest.balls;
        this.maidens = createRequest.maidens;
        this.runs = createRequest.runs;
        this.wickets = createRequest.wickets;
        this.innings = createRequest.innings;
        this.isOfficialMatch = match.isOfficial;
        this.gameTypeId = gameTypeId;
        this.teamType = teamTypeMap[teamMap[playerTeamMap[createRequest.playerId]].typeId];
    }
}

module.exports = {
    BowlingFigureModel,
    BowlingFigure
};
