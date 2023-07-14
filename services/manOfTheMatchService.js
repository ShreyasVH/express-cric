const ManOfTheMatchRepository = require('../repositories/manOfTheMatchRepository');

class ManOfTheMatchService {
    constructor() {
        this.manOfTheMatchRepository = new ManOfTheMatchRepository();
    }

    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session) {
        return this.manOfTheMatchRepository.add(matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session);
    }
}

module.exports = ManOfTheMatchService;
