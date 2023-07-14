const connectDatabase = require('../config/database');
const { CaptainModel, Captain } = require('../models/captain');

class CaptainRepository {
    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameTypeId, session) {
        await connectDatabase();

        const addedEntries = [];

        for (const playerId of playerIds) {
            const captain = new Captain(matchId, playerId, teamMap[playerTeamMap[playerId]], gameTypeId, teamTypeMap);
            const captainModel = new CaptainModel(captain);
            addedEntries.push(await captainModel.save({ session }));
        }

        return addedEntries;
    }
}

module.exports = CaptainRepository;
