const { connectDatabase } = require('../config/database');
const { ManOfTheMatchModel, ManOfTheMatch } = require('../models/manOfTheMatch');

class ManOfTheMatchRepository {
    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session) {
        await connectDatabase();

        const addedEntries = [];

        for (const playerId of playerIds) {
            const manOfTheMatch = new ManOfTheMatch(matchId, playerId, teamMap[playerTeamMap[playerId]], gameType, teamTypeMap);
            const manOfTheMatchModel = new ManOfTheMatchModel(manOfTheMatch);
            addedEntries.push(await manOfTheMatchModel.save({ session }));
        }

        return addedEntries;
    }

    async getByMatchId (matchId) {
        await connectDatabase();
        return ManOfTheMatchModel.find({ matchId: matchId });
    }

    async remove (matchId) {
        await connectDatabase();

        await ManOfTheMatchModel.deleteMany({ matchId: matchId });
    }

    async merge (mergeRequest) {
        await connectDatabase();

        await ManOfTheMatchModel.updateMany({ 'playerId': mergeRequest.playerIdToMerge }, { "$set": { 'playerId': mergeRequest.originalPlayerId } });
    }
}

module.exports = ManOfTheMatchRepository;
