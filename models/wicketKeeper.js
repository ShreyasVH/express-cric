const mongoose = require('mongoose');

const { configureAutoIncrement } = require('./baseModel');
const TeamTypeResponse = require('../responses/teamTypeResponse');

const wicketKeeperSchema = new mongoose.Schema({
    _id: { type: Number },
    matchId: { type: Number, required: true },
    playerId: { type: Number, required: true },
    teamId: { type: Number, required: true },
    gameTypeId: { type: Number, required: true },
    teamType: { type: Object, required: true }
},  { collection: 'wicketKeepers' });

configureAutoIncrement(wicketKeeperSchema, 'wicketKeepers');

const WicketKeeperModel = mongoose.model('WicketKeeper', wicketKeeperSchema);

class WicketKeeper {
    constructor (matchId, playerId, team, gameTypeId, teamTypeMap) {
        this.matchId = matchId;
        this.playerId = playerId;
        this.teamId = team.id;
        this.gameTypeId = gameTypeId;
        this.teamType = new TeamTypeResponse(teamTypeMap[team.typeId]);
    }
}

module.exports = {
    WicketKeeper,
    WicketKeeperModel
};
