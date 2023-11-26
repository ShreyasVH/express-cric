const CaptainRepository = require('../repositories/captainRepository');

class CaptainService {
    constructor() {
        this.captainRepository = new CaptainRepository();
    }

    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session) {
        return this.captainRepository.add(matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session);
    }

    async getByMatchId (matchId) {
        return this.captainRepository.getByMatchId(matchId);
    }

    async remove (matchId) {
        await this.captainRepository.remove(matchId);
    }
}

module.exports = CaptainService;
