const mongoose = require('mongoose');

const { dateTimeSchema } = require('./schemaExtensions');

const matchSchema = new mongoose.Schema({
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
    team1Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    team2Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    tossWinnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: false },
    batFirstId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: false },
    resultTypeId: { type: Number, required: true },
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: false },
    winMargin: { type: Number, required: false },
    winMarginTypeId: { type: Number, required: false },
    stadiumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', required: true },
    startTime: dateTimeSchema,
    isOfficial: { type: Boolean, required: true }
},  { collection: 'matches' });

const MatchModel = mongoose.model('Match', matchSchema);

class Match {
    constructor(createRequest) {
        this.seriesId = createRequest.seriesId;
        this.team1Id = createRequest.team1Id;
        this.team2Id = createRequest.team2Id;
        this.tossWinnerId = createRequest.tossWinnerId;
        this.batFirstId = createRequest.batFirstId;
        this.resultTypeId = createRequest.resultTypeId;
        this.winnerId = createRequest.winnerId;
        this.winMargin = createRequest.winMargin;
        this.winMarginTypeId = createRequest.winMarginTypeId;
        this.stadiumId = createRequest.stadiumId;
        this.startTime = createRequest.startTime;
        this.isOfficial = createRequest.isOfficial;
    }
}

module.exports = {
    MatchModel,
    Match
};
