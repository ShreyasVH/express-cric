const mongoose = require('mongoose');

const { dateTimeSchema } = require('./schemaExtensions');
const DismissalModeResponse = require('../responses/dismissalModeResponse');

const battingScoreSchema = new mongoose.Schema({
    batsman: { type: Object, required: true },
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    runs: { type: Number, required: true },
    balls: { type: Number, required: true },
    fours: { type: Number, required: true },
    sixes: { type: Number, required: true },
    dismissalMode: { type: Object, required: false },
    bowler: { type: Object, required: false },
    fielders: {type: Array, required: false},
    innings: { type: Number, required: true },
    number: { type: Number, required: false },
    isOfficialMatch: { type: Boolean, required: true},
    gameType: { type: Object, required: true },
    teamType: { type: Object, require: true },
    matchStartTime: dateTimeSchema,
    matchStadiumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', required: true },
    opposingTeam: { type: Object, required: true }
}, { collection: 'battingScores' });

const BattingScoreModel = mongoose.model('BattingScore', battingScoreSchema);

class BattingScore {
    constructor(createRequest, playerTeamMap, dismissalModeMap, match, gameType, teamMap, teamTypeMap) {
        const batsmanTeamId = playerTeamMap[createRequest.playerId];
        const opposingTeamId = Object.keys(teamMap).filter(teamId => teamId !== batsmanTeamId)[0];
        this.batsman = {
            playerId: createRequest.playerId,
            teamId: batsmanTeamId
        };
        this.matchId = match.id;
        this.runs = createRequest.runs;
        this.balls = createRequest.balls;
        this.fours = createRequest.fours;
        this.sixes = createRequest.sixes;
        if (createRequest.dismissalModeId) {
            this.dismissalMode = new DismissalModeResponse(dismissalModeMap[createRequest.dismissalModeId]);
        }
        if (createRequest.bowlerId) {
            this.bowler = {
                playerId: createRequest.bowlerId,
                teamId: playerTeamMap[createRequest.bowlerId]
            };
        }
        if (createRequest.fielderIds) {
            this.fielders = createRequest.fielderIds.map(playerId => ({
                playerId: playerId,
                teamId: playerTeamMap[playerId]
            }));
        }
        this.innings = createRequest.innings;
        this.number = createRequest.number;
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
    BattingScoreModel,
    BattingScore
};
