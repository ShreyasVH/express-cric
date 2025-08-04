const mongoose = require('mongoose');

const TeamTypeResponse = require('../responses/teamTypeResponse');

const manOfTheMatchSchema = new mongoose.Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    gameType: { type: Object, required: true },
    teamType: { type: Object, required: true }
},  { collection: 'manOfTheMatch' });

const ManOfTheMatchModel = mongoose.model('ManOfTheMatch', manOfTheMatchSchema);

class ManOfTheMatch {
    constructor (matchId, playerId, team, gameType, teamTypeMap) {
        this.matchId = matchId;
        this.playerId = playerId;
        this.teamId = team.id;
        this.gameType = gameType;
        this.teamType = new TeamTypeResponse(teamTypeMap[team.typeId]);
    }
}

module.exports = {
    ManOfTheMatch,
    ManOfTheMatchModel
};
