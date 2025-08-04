const mongoose = require('mongoose');

const { dateTimeSchema } = require('./schemaExtensions');

const bowlingFigureSchema = new mongoose.Schema({
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    balls: { type: Number, required: true },
    maidens: { type: Number, required: true },
    runs: { type: Number, required: true },
    wickets: { type: Number, required: true },
    innings: { type: Number, required: true },
    isOfficialMatch: { type: Boolean, required: true},
    gameType: { type: Object, required: true },
    teamType: { type: Object, require: true },
    matchStartTime: dateTimeSchema,
    matchStadiumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', required: true },
    opposingTeam: { type: Object, required: true }
}, { collection: 'bowlingFigures' });

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
