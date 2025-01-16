const connectDatabase = require('../config/database');
const { CaptainModel, Captain } = require('../models/captain');

class CaptainRepository {
    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session) {
        await connectDatabase();

        const addedEntries = [];

        for (const playerId of playerIds) {
            const captain = new Captain(matchId, playerId, teamMap[playerTeamMap[playerId]], gameType, teamTypeMap);
            const captainModel = new CaptainModel(captain);
            addedEntries.push(await captainModel.save({ session }));
        }

        return addedEntries;
    }

    async getByMatchId (matchId) {
        await connectDatabase();

        return CaptainModel.find({ matchId: matchId });
    }

    async remove (matchId) {
        await connectDatabase();

        await CaptainModel.deleteMany({ matchId: matchId });
    }

    async merge (mergeRequest) {
        await connectDatabase();

        await CaptainModel.updateMany({ 'playerId': mergeRequest.playerIdToMerge }, { "$set": { 'playerId': mergeRequest.originalPlayerId } });
    }
}

module.exports = CaptainRepository;
