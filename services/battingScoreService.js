const BattingScoreRepository = require('../repositories/battingScoreRepository');

class BattingScoreService {
    constructor() {
        this.battingScoreRepository = new BattingScoreRepository();
    }

    async add(battingScoreRequests, playerTeamMap, dismissalModeMap, match, gameType, teamMap, teamTypeMap, session) {
        return this.battingScoreRepository.add(battingScoreRequests, playerTeamMap, dismissalModeMap, match, gameType, teamMap, teamTypeMap, session);
    }

    async getDismissalStats (playerId) {
        return this.battingScoreRepository.getDismissalStats(playerId);
    }

    async getBattingStats (playerId) {
        return this.battingScoreRepository.getBattingStats(playerId);
    }

    async getFieldingStats (playerId) {
        return this.battingScoreRepository.getFieldingStats(playerId);
    }

    async getByMatchId (matchId) {
        return this.battingScoreRepository.getByMatchId(matchId);
    }

    async remove (matchId) {
        await this.battingScoreRepository.remove(matchId);
    }

    async merge (mergeRequest) {
        await this.battingScoreRepository.merge(mergeRequest);
    }
}

module.exports = BattingScoreService;
