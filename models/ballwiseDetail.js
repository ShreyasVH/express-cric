const mongoose = require('mongoose');

const { dateTimeSchema } = require('./schemaExtensions');
const { getObjectId } = require('../config/database');

const partnershipSchema = new mongoose.Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    batsman: { type: Object, required: true },
    bowler: { type: Object, required: true },
    innings: { type: Number, required: true },
    ball: { type: Number, required: true },
    totalRuns: { type: Number, required: true },
    batsmanRuns: { type: Number, required: true },
    bowlerRuns: { type: Number, required: true },
    extrasRuns: { type: Number, required: true },
    dismissal: { type: Boolean, required: true },
    extrasType: { type: String, required: false },
    timestamp: { type: Number, required: true },
    isOfficialMatch: { type: Boolean, required: true},
    gameType: { type: Object, required: true },
    teamType: { type: Object, require: true },
    matchStartTime: dateTimeSchema,
    matchStadiumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', required: true },
    opposingTeam: { type: Object, required: true },
    seriesTags: {type: Array, required: false},
    matchTags: {type: Array, required: false}
}, { collection: 'ballwiseDetails' });

const BallwiseDetailModel = mongoose.model('BallwiseDetail', partnershipSchema);

class BallwiseDetail {
    constructor(createRequest, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags) {
        this.batsman = {
            id: getObjectId(createRequest.batsmanPlayerId),
            name: playerMap[createRequest.batsmanPlayerId].name
        };
        this.bowler = {
            id: getObjectId(createRequest.bowlerPlayerId),
            name: playerMap[createRequest.bowlerPlayerId].name
        };
        this.innings = createRequest.innings;
        this.ball = createRequest.ball;
        this.teamId = playerTeamMap[createRequest.batsmanPlayerId];
        const opposingTeamId = Object.keys(teamMap).filter(teamId => teamId !== this.teamId)[0];
        this.matchId = match.id;
        this.totalRuns = createRequest.totalRuns;
        this.batsmanRuns = createRequest.batsmanRuns;
        this.bowlerRuns = createRequest.bowlerRuns;
        this.extrasRuns = createRequest.extrasRuns;
        this.dismissal = createRequest.dismissal;
        if (createRequest.extrasType) {
            this.extrasType = createRequest.extrasType;
        }
        this.timestamp = createRequest.timestamp;
        this.isOfficialMatch = match.isOfficial;
        this.gameType = gameType;
        this.teamType = teamTypeMap[teamMap[playerTeamMap[createRequest.batsmanPlayerId]].typeId];
        this.matchStartTime = match.startTime;
        const opposingTeam = teamMap[opposingTeamId];
        this.opposingTeam = {
            id: opposingTeam._id,
            teamType: opposingTeam.typeId
        };
        this.matchStadiumId = match.stadiumId;
        if (seriesTags.length > 0) {
            this.seriesTags = seriesTags.map(t => ({ id: t.id, name: t.name }));
        }
        if (matchTags.length > 0) {
            this.matchTags = matchTags.map(t => ({ id: t.id, name: t.name }));
        }
    }
}

module.exports = {
    BallwiseDetailModel,
    BallwiseDetail
};
