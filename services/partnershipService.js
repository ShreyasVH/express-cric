const PartnershipRepository = require('../repositories/partnershipRepository');

class PartnershipService {
    constructor() {
        this.partnershipRepository = new PartnershipRepository();
    }

    async add(partnershipRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, session) {
        return this.partnershipRepository.add(partnershipRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, session);
    }

    // async getByMatchId (matchId) {
    //     return this.bowlingFigureRepository.getByMatchId(matchId);
    // }
    //
    // async remove (matchId) {
    //     await this.bowlingFigureRepository.remove(matchId);
    // }
    //
    // async merge (mergeRequest) {
    //     await this.bowlingFigureRepository.merge(mergeRequest);
    // }
}

module.exports = PartnershipService;
