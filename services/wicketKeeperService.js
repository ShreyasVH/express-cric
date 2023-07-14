const WicketKeeperRepository = require('../repositories/wicketKeeperRepository');

class WicketKeeperService {
    constructor() {
        this.wicketKeeperRepository = new WicketKeeperRepository();
    }

    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameTypeId, session) {
        return this.wicketKeeperRepository.add(matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameTypeId, session);
    }
}

module.exports = WicketKeeperService;
