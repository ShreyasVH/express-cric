const BowlingFigureRepository = require('../repositories/bowlingFigureRepository');

class BowlingFigureService {
    constructor() {
        this.bowlingFigureRepository = new BowlingFigureRepository();
    }

    async add(bowlingFigureRequests, playerTeamMap, match, gameTypeId, teamMap, teamTypeMap, session) {
        return this.bowlingFigureRepository.add(bowlingFigureRequests, playerTeamMap, match, gameTypeId, teamMap, teamTypeMap, session);
    }
}

module.exports = BowlingFigureService;
