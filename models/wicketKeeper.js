const mongoose = require('mongoose');

const { configureAutoIncrement } = require('./baseModel');
const TeamTypeResponse = require('../responses/teamTypeResponse');

const wicketKeeperSchema = new mongoose.Schema({
    // _id: { type: Number },
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    gameType: { type: Object, required: true },
    teamType: { type: Object, required: true }
},  { collection: 'wicketKeepers' });

// configureAutoIncrement(wicketKeeperSchema, 'wicketKeepers');

const WicketKeeperModel = mongoose.model('WicketKeeper', wicketKeeperSchema);

class WicketKeeper {
    constructor (matchId, playerId, team, gameType, teamTypeMap) {
        this.matchId = matchId;
        this.playerId = playerId;
        this.teamId = team.id;
        this.gameType = gameType;
        this.teamType = new TeamTypeResponse(teamTypeMap[team.typeId]);
    }
}

module.exports = {
    WicketKeeper,
    WicketKeeperModel
};
