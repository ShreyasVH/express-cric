const mongoose = require('mongoose');

const totalSchema = new mongoose.Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    runs: { type: Number, required: true },
    wickets: { type: Number, required: true },
    balls: { type: Number, required: true },
    innings: { type: Number, required: true },
}, { collection: 'totals' });

const TotalModel = mongoose.model('Total', totalSchema);

class Total {
    constructor(matchId, totalRequestEntry) {
        this.matchId = matchId;
        this.teamId = totalRequestEntry.teamId;
        this.runs = totalRequestEntry.runs;
        this.wickets = totalRequestEntry.wickets;
        this.balls = totalRequestEntry.balls;
        this.innings = totalRequestEntry.innings;
    }
}

module.exports = {
    TotalModel,
    Total
};
