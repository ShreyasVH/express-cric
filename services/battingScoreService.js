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
}

module.exports = BattingScoreService;
