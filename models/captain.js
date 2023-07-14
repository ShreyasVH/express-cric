const mongoose = require('mongoose');

const { configureAutoIncrement } = require('./baseModel');
const TeamTypeResponse = require('../responses/teamTypeResponse');

const captainSchema = new mongoose.Schema({
    _id: { type: Number },
    matchId: { type: Number, required: true },
    playerId: { type: Number, required: true },
    teamId: { type: Number, required: true },
    gameType: { type: Object, required: true },
    teamType: { type: Object, required: true }
},  { collection: 'captains' });

configureAutoIncrement(captainSchema, 'captains');

const CaptainModel = mongoose.model('Captain', captainSchema);

class Captain {
    constructor (matchId, playerId, team, gameType, teamTypeMap) {
        this.matchId = matchId;
        this.playerId = playerId;
        this.teamId = team.id;
        this.gameType = gameType;
        this.teamType = new TeamTypeResponse(teamTypeMap[team.typeId]);
    }
}

module.exports = {
    Captain,
    CaptainModel
};
