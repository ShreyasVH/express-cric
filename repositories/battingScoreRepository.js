const connectDatabase = require('../config/database');
const { BattingScoreModel, BattingScore } = require('../models/battingScore');

class BattingScoreRepository {
    async add (battingScoreRequests, playerTeamMap, dismissalModeMap, match, gameTypeId, teamMap, teamTypeMap, session) {
        await connectDatabase();

        const addedEntries = [];
        for (const battingScoreRequest of battingScoreRequests) {
            const battingScore = new BattingScore(battingScoreRequest, playerTeamMap, dismissalModeMap, match, gameTypeId, teamMap, teamTypeMap);
            const battingScoreModel = new BattingScoreModel(battingScore);
            addedEntries.push(await battingScoreModel.save({ session }));
        }

        return addedEntries;
    }
}

module.exports = BattingScoreRepository;
