const { connectDatabase } = require('../config/database');
const { WicketKeeperModel, WicketKeeper } = require('../models/wicketKeeper');

class WicketKeeperRepository {
    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session) {
        await connectDatabase();

        const addedEntries = [];

        for (const playerId of playerIds) {
            const wicketKeeper = new WicketKeeper(matchId, playerId, teamMap[playerTeamMap[playerId]], gameType, teamTypeMap);
            const wicketKeeperModel = new WicketKeeperModel(wicketKeeper);
            addedEntries.push(await wicketKeeperModel.save({ session, ordered: true }));
        }

        return addedEntries;
    }

    async getByMatchId (matchId) {
        await connectDatabase();
        return WicketKeeperModel.find({ matchId: matchId });
    }

    async remove (matchId) {
        await connectDatabase();

        await WicketKeeperModel.deleteMany({ matchId: matchId });
    }

    async merge (mergeRequest) {
        await connectDatabase();

        await WicketKeeperModel.updateMany({ 'playerId': mergeRequest.playerIdToMerge }, { "$set": { 'playerId': mergeRequest.originalPlayerId } });
    }
}

module.exports = WicketKeeperRepository;
