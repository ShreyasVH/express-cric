const mongoose = require('mongoose');

const { CounterModel } = require('./counter');
const { dateTimeSchema } = require('./schemaExtensions');

const matchSchema = new mongoose.Schema({
    _id: { type: Number },
    seriesId: { type: Number, required: true },
    team1Id: { type: Number, required: true },
    team2Id: { type: Number, required: true },
    tossWinnerId: { type: Number, required: false },
    batFirstId: { type: Number, required: false },
    resultTypeId: { type: Number, required: true },
    winnerId: { type: Number, required: false },
    winMargin: { type: Number, required: false },
    winMarginTypeId: { type: Number, required: false },
    stadiumId: { type: Number, required: true },
    startTime: dateTimeSchema,
    isOfficial: { type: Boolean, required: true }
},  { collection: 'matches' });

matchSchema.pre('save', async function (next) {
    const match = this;
    try {
        const counter = await CounterModel.findByIdAndUpdate(
            'match',
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        match._id = counter.sequenceValue;
        next();
    } catch (error) {
        console.error('Failed to generate match ID:', error);
        throw error;
    }
});

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
