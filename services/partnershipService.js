const PartnershipRepository = require('../repositories/partnershipRepository');

class PartnershipService {
    constructor() {
        this.partnershipRepository = new PartnershipRepository();
    }

    async add(partnershipRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, session) {
        return this.partnershipRepository.add(partnershipRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, session);
    }

    async getByMatchId (matchId) {
        return this.partnershipRepository.getByMatchId(matchId);
    }

    async remove (matchId) {
        await this.partnershipRepository.remove(matchId);
    }
}

module.exports = PartnershipService;
