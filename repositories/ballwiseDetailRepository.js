const { connectDatabase, getObjectId } = require('../config/database');
const { BallwiseDetail, BallwiseDetailModel } = require('../models/ballwiseDetail');

class BallwiseDetailRepository {
    async add (ballwiseDetailRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, session) {
        await connectDatabase();

        const addedEntries = [];
        for (const ballwiseDetailRequest of ballwiseDetailRequests) {
            const ballwiseDetail = new BallwiseDetail(ballwiseDetailRequest, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, true);
            const ballwiseDetailModel = new BallwiseDetailModel(ballwiseDetail);
            addedEntries.push(await ballwiseDetailModel.save({ session, ordered: true }));
        }

        return addedEntries;
    }

    // async getByMatchId (matchId) {
    //     await connectDatabase();
    //
    //     return PartnershipModel.find({ matchId: getObjectId(matchId), primaryEntry: true });
    // }
    //
    // async remove (matchId) {
    //     await connectDatabase();
    //
    //     await PartnershipModel.deleteMany({ matchId: matchId });
    // }
}

module.exports = BallwiseDetailRepository;
