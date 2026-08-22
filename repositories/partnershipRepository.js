const { connectDatabase, getObjectId } = require('../config/database');
const { Partnership, PartnershipModel } = require('../models/partnership');

class PartnershipRepository {
    async add (partnershipRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, session) {
        await connectDatabase();

        const addedEntries = [];
        for (const partnershipRequest of partnershipRequests) {
            const partnership1 = new Partnership(partnershipRequest, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, true);
            const partnershipModel1 = new PartnershipModel(partnership1);
            const partnership2 = new Partnership(partnershipRequest, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, false);
            const partnershipModel2 = new PartnershipModel(partnership2);
            addedEntries.push(await partnershipModel1.save({ session, ordered: true }));
            addedEntries.push(await partnershipModel2.save({ session, ordered: true }));
        }

        return addedEntries;
    }

    async getByMatchId (matchId) {
        await connectDatabase();

        return PartnershipModel.find({ matchId: getObjectId(matchId), primaryEntry: true });
    }

    async remove (matchId) {
        await connectDatabase();

        await PartnershipModel.deleteMany({ matchId: matchId });
    }
}

module.exports = PartnershipRepository;
