const BallwiseDetailRepository = require('../repositories/ballwiseDetailRepository');

class BallwiseDetailService {
    constructor() {
        this.ballwiseDetailRepository = new BallwiseDetailRepository();
    }

    async add(ballwiseDetailRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, session) {
        return this.ballwiseDetailRepository.add(ballwiseDetailRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, seriesTags, matchTags, session);
    }

    // async getByMatchId (matchId) {
    //     return this.partnershipRepository.getByMatchId(matchId);
    // }

    async remove (matchId) {
        await this.ballwiseDetailRepository.remove(matchId);
    }
}

module.exports = BallwiseDetailRepository;
