const BattingScoreRepository = require('../repositories/battingScoreRepository');

class BattingScoreService {
    constructor() {
        this.battingScoreRepository = new BattingScoreRepository();
    }

    async add(battingScoreRequests, playerTeamMap, dismissalModeMap, match, gameTypeId, teamMap, teamTypeMap, session) {
        return this.battingScoreRepository.add(battingScoreRequests, playerTeamMap, dismissalModeMap, match, gameTypeId, teamMap, teamTypeMap, session);
    }
}

module.exports = BattingScoreService;
