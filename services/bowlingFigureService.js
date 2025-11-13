const BowlingFigureRepository = require('../repositories/bowlingFigureRepository');

class BowlingFigureService {
    constructor() {
        this.bowlingFigureRepository = new BowlingFigureRepository();
    }

    async add(bowlingFigureRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, session) {
        return this.bowlingFigureRepository.add(bowlingFigureRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, playerMap, session);
    }

    async getBowlingStats (playerId) {
        return this.bowlingFigureRepository.getBowlingStats(playerId);
    }

    async getByMatchId (matchId) {
        return this.bowlingFigureRepository.getByMatchId(matchId);
    }

    async remove (matchId) {
        await this.bowlingFigureRepository.remove(matchId);
    }

    async merge (mergeRequest) {
        await this.bowlingFigureRepository.merge(mergeRequest);
    }
}

module.exports = BowlingFigureService;
