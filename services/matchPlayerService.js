const MatchPlayerMapRepository = require('../repositories/matchPlayerMapRepository');

class MatchPlayerMapService {
    constructor() {
        this.matchPlayerMapRepository = new MatchPlayerMapRepository();
    }

    async add(matchId, playerIds, playerTeamMap, session) {
        return this.matchPlayerMapRepository.add(matchId, playerIds, playerTeamMap, session);
    }
}

module.exports = MatchPlayerMapService;
