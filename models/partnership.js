const mongoose = require('mongoose');

const { dateTimeSchema } = require('./schemaExtensions');

const partnershipSchema = new mongoose.Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    innings: { type: Number, required: true },
    wicket: { type: Number, required: true },
    runs: { type: Number, required: true },
    balls: { type: Number, required: true },
    ended: { type: Boolean, required: true },
    playerId1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    playerName1: { type: String, required: true },
    playerId2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    playerName2: { type: String, required: true },
    primaryEntry: { type: Boolean, required: true },
    isOfficialMatch: { type: Boolean, required: true},
    gameType: { type: Object, required: true },
    teamType: { type: Object, require: true },
    matchStartTime: dateTimeSchema,
    matchStadiumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', required: true },
    opposingTeam: { type: Object, required: true },
    seriesTags: {type: Array, required: false},
    matchTags: {type: Array, required: false}
}, { collection: 'partnerships' });

const PartnershipModel = mongoose.model('Partnership', partnershipSchema);

class Partnership {
    constructor(createRequest, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, primary) {
        if (primary) {
            this.playerId1 = createRequest.playerId1;
            this.playerName1 = playerMap[createRequest.playerId1].name;
            this.runs1 = createRequest.runs1;
            this.balls1 = createRequest.balls1;
            this.playerId2 = createRequest.playerId2;
            this.playerName2 = playerMap[createRequest.playerId2].name;
            this.runs2 = createRequest.runs2;
            this.balls2 = createRequest.balls2;
        } else {
            this.playerId1 = createRequest.playerId2;
            this.playerName1 = playerMap[createRequest.playerId2].name;
            this.runs1 = createRequest.runs2;
            this.balls1 = createRequest.balls2;
            this.playerId2 = createRequest.playerId1;
            this.playerName2 = playerMap[createRequest.playerId1].name;
            this.runs2 = createRequest.runs1;
            this.balls2 = createRequest.balls1;
        }

        this.teamId = playerTeamMap[createRequest.playerId1];
        const opposingTeamId = Object.keys(teamMap).filter(teamId => teamId !== this.teamId)[0];
        this.matchId = match.id;
        this.wicket = createRequest.wicket;
        this.innings = createRequest.innings;
        this.runs = createRequest.runs;
        this.balls = createRequest.balls;
        this.ended = createRequest.ended;
        this.isOfficialMatch = match.isOfficial;
        this.gameType = gameType;
        this.teamType = teamTypeMap[teamMap[playerTeamMap[createRequest.playerId1]].typeId];
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
        this.primaryEntry = primary;
    }
}

module.exports = {
    PartnershipModel,
    Partnership
};
