const MatchPlayerMapRepository = require('../repositories/matchPlayerMapRepository');

class MatchPlayerMapService {
    constructor() {
        this.matchPlayerMapRepository = new MatchPlayerMapRepository();
    }

    async add(matchId, playerIds, playerTeamMap, session) {
        return this.matchPlayerMapRepository.add(matchId, playerIds, playerTeamMap, session);
    }

    async getByMatchId (matchId) {
        return this.matchPlayerMapRepository.getByMatchId(matchId);
    }

    async remove (matchId) {
        await this.matchPlayerMapRepository.remove(matchId);
    }

    async merge (mergeRequest) {
        await this.matchPlayerMapRepository.merge(mergeRequest);
    }
}

module.exports = MatchPlayerMapService;
