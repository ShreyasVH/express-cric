const CaptainRepository = require('../repositories/captainRepository');

class CaptainService {
    constructor() {
        this.captainRepository = new CaptainRepository();
    }

    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameTypeId, session) {
        return this.captainRepository.add(matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameTypeId, session);
    }
}

module.exports = CaptainService;
