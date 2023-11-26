const WicketKeeperRepository = require('../repositories/wicketKeeperRepository');

class WicketKeeperService {
    constructor() {
        this.wicketKeeperRepository = new WicketKeeperRepository();
    }

    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session) {
        return this.wicketKeeperRepository.add(matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session);
    }

    async getByMatchId (matchId) {
        return this.wicketKeeperRepository.getByMatchId(matchId);
    }

    async remove (matchId) {
        await this.wicketKeeperRepository.remove(matchId);
    }
}

module.exports = WicketKeeperService;
