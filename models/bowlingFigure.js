const mongoose = require('mongoose');

const { CounterModel } = require('./counter');
const { dateTimeSchema } = require('./schemaExtensions');

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
    gameType: { type: Object, required: true },
    teamType: { type: Object, require: true },
    matchStartTime: dateTimeSchema,
    matchStadiumId: { type: Number, required: true },
    opposingTeam: { type: Object, required: true }
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
    constructor(createRequest, playerTeamMap, match, gameType, teamMap, teamTypeMap) {
        this.playerId = createRequest.playerId;
        const bowlerTeamId = playerTeamMap[createRequest.playerId];
        this.teamId = bowlerTeamId
        const opposingTeamId = Object.keys(teamMap).filter(teamId => teamId !== bowlerTeamId)[0];
        this.matchId = match.id;
        this.balls = createRequest.balls;
        this.maidens = createRequest.maidens;
        this.runs = createRequest.runs;
        this.wickets = createRequest.wickets;
        this.innings = createRequest.innings;
        this.isOfficialMatch = match.isOfficial;
        this.gameType = gameType;
        this.teamType = teamTypeMap[teamMap[playerTeamMap[createRequest.playerId]].typeId];
        this.matchStartTime = match.startTime;
        const opposingTeam = teamMap[opposingTeamId];
        this.opposingTeam = {
            id: opposingTeam._id,
            teamType: opposingTeam.typeId
        };
        this.matchStadiumId = match.stadiumId;
    }
}

module.exports = {
    BowlingFigureModel,
    BowlingFigure
};
