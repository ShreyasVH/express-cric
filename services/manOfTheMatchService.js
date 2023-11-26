const ManOfTheMatchRepository = require('../repositories/manOfTheMatchRepository');

class ManOfTheMatchService {
    constructor() {
        this.manOfTheMatchRepository = new ManOfTheMatchRepository();
    }

    async add (matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session) {
        return this.manOfTheMatchRepository.add(matchId, playerIds, playerTeamMap, teamMap, teamTypeMap, gameType, session);
    }

    async getByMatchId (matchId) {
        return this.manOfTheMatchRepository.getByMatchId(matchId);
    }

    async remove (matchId) {
        await this.manOfTheMatchRepository.remove(matchId);
    }
}

module.exports = ManOfTheMatchService;
