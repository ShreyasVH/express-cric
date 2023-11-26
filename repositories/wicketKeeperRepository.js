const connectDatabase = require('../config/database');
const { WicketKeeperModel, WicketKeeper } = require('../models/wicketKeeper');

class WicketKeeperRepository {
    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session) {
        await connectDatabase();

        const addedEntries = [];

        for (const playerId of playerIds) {
            const wicketKeeper = new WicketKeeper(matchId, playerId, teamMap[playerTeamMap[playerId]], gameType, teamTypeMap);
            const wicketKeeperModel = new WicketKeeperModel(wicketKeeper);
            addedEntries.push(await wicketKeeperModel.save({ session }));
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
}

module.exports = WicketKeeperRepository;
