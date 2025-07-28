const mongoose = require('mongoose');

const matchPlayerMapSchema = new mongoose.Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }
}, { collection: 'matchPlayerMap' });

const MatchPlayerMapModel = mongoose.model('MatchPlayerMap', matchPlayerMapSchema);

class MatchPlayerMap {
    constructor(matchId, playerId, teamId) {
        this.matchId = matchId;
        this.playerId = playerId;
        this.teamId = teamId;
    }
}

module.exports = {
    MatchPlayerMapModel,
    MatchPlayerMap
};
