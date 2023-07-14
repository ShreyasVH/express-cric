const ManOfTheMatchRepository = require('../repositories/manOfTheMatchRepository');

class ManOfTheMatchService {
    constructor() {
        this.manOfTheMatchRepository = new ManOfTheMatchRepository();
    }

    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameTypeId, session) {
        return this.manOfTheMatchRepository.add(matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameTypeId, session);
    }
}

module.exports = ManOfTheMatchService;
