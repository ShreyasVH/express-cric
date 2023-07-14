const connectDatabase = require('../config/database');
const { WicketKeeperModel, WicketKeeper } = require('../models/wicketKeeper');

class WicketKeeperRepository {
    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameTypeId, session) {
        await connectDatabase();

        const addedEntries = [];

        for (const playerId of playerIds) {
            const wicketKeeper = new WicketKeeper(matchId, playerId, teamMap[playerTeamMap[playerId]], gameTypeId, teamTypeMap);
            const wicketKeeperModel = new WicketKeeperModel(wicketKeeper);
            addedEntries.push(await wicketKeeperModel.save({ session }));
        }

        return addedEntries;
    }
}

module.exports = WicketKeeperRepository;
