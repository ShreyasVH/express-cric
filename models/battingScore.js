const mongoose = require('mongoose');

const { CounterModel } = require('./counter');
const DismissalModeResponse = require('../responses/dismissalModeResponse');

const battingScoreSchema = new mongoose.Schema({
    _id: { type: Number },
    batsman: { type: Object, required: true },
    matchId: { type: Number, required: true },
    runs: { type: Number, required: true },
    balls: { type: Number, required: true },
    fours: { type: Number, required: true },
    sixes: { type: Number, required: true },
    dismissalMode: { type: Object, required: false },
    bowler: { type: Object, required: false },
    fielders: {type: Array, required: false},
    innings: { type: Number, required: true },
    number: { type: Number, required: false },
    isOfficialMatch: { type: Boolean, required: true},
    gameTypeId: { type: Number, required: true },
    teamType: { type: Object, require: true }
}, { collection: 'battingScores' });

battingScoreSchema.pre('save', async function (next) {
    const battingScore = this;
    try {
        const counter = await CounterModel.findByIdAndUpdate(
            'battingScores',
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        battingScore._id = counter.sequenceValue;
        next();
    } catch (error) {
        console.error('Failed to generate batting score ID:', error);
        throw error;
    }
});

const BattingScoreModel = mongoose.model('BattingScore', battingScoreSchema);

class BattingScore {
    constructor(createRequest, playerTeamMap, dismissalModeMap, match, gameTypeId, teamMap, teamTypeMap) {
        this.batsman = {
            playerId: createRequest.playerId,
            teamId: playerTeamMap[createRequest.playerId]
        };
        this.matchId = match.id;
        this.runs = createRequest.runs;
        this.balls = createRequest.balls;
        this.fours = createRequest.fours;
        this.sixes = createRequest.sixes;
        if (createRequest.dismissalModeId) {
            this.dismissalMode = new DismissalModeResponse(dismissalModeMap[createRequest.dismissalModeId]);
        }
        if (createRequest.bowlerId) {
            this.bowler = {
                playerId: createRequest.bowlerId,
                teamId: playerTeamMap[createRequest.bowlerId]
            };
        }
        if (createRequest.fielderIds) {
            this.fielders = createRequest.fielderIds.map(playerId => ({
                playerId: playerId,
                teamId: playerTeamMap[playerId]
            }));
        }
        this.innings = createRequest.innings;
        this.number = createRequest.number;
        this.isOfficialMatch = match.isOfficial;
        this.gameTypeId = gameTypeId;
        this.teamType = teamTypeMap[teamMap[playerTeamMap[createRequest.playerId]].typeId];
    }
}

module.exports = {
    BattingScoreModel,
    BattingScore
};
