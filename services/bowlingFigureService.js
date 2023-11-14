const BowlingFigureRepository = require('../repositories/bowlingFigureRepository');

class BowlingFigureService {
    constructor() {
        this.bowlingFigureRepository = new BowlingFigureRepository();
    }

    async add(bowlingFigureRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, session) {
        return this.bowlingFigureRepository.add(bowlingFigureRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, session);
    }

    async getBowlingStats (playerId) {
        return this.bowlingFigureRepository.getBowlingStats(playerId);
    }

    async getByMatchId (matchId) {
        return this.bowlingFigureRepository.getByMatchId(matchId);
    }
}

module.exports = BowlingFigureService;
