const WicketKeeperRepository = require('../repositories/wicketKeeperRepository');

class WicketKeeperService {
    constructor() {
        this.wicketKeeperRepository = new WicketKeeperRepository();
    }

    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session) {
        return this.wicketKeeperRepository.add(matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session);
    }
}

module.exports = WicketKeeperService;
