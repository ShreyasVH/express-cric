const connectDatabase = require('../config/database');
const { MatchPlayerMapModel, MatchPlayerMap } = require('../models/matchPlayerMap');

class MatchPlayerMapRepository {
    async add (matchId, playerIds, playerTeamMap, session) {
        await connectDatabase();

        const matchPlayerMaps = playerIds.map(playerId => new MatchPlayerMap(matchId, playerId, playerTeamMap[playerId]));

        const finalResponse = [];

        for (const matchPlayerMap of matchPlayerMaps) {
            const matchPlayerMapModel = new MatchPlayerMapModel(matchPlayerMap);
            finalResponse.push(await matchPlayerMapModel.save({ session }));
        }

        return finalResponse;
    }

    async getByMatchId(matchId) {
        await connectDatabase();
        return MatchPlayerMapModel.find({ matchId: matchId });
    }

    async remove (matchId) {
        await connectDatabase();

        await MatchPlayerMapModel.deleteMany({ matchId: matchId });
    }

    async merge (mergeRequest) {
        await connectDatabase();

        await MatchPlayerMapModel.updateMany({ playerId: mergeRequest.playerIdToMerge }, { "$set": { playerId: mergeRequest.originalPlayerId } });
    }
}

module.exports = MatchPlayerMapRepository;
