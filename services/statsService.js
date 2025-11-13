const PlayerRepository = require('../repositories/playerRepository');
const StatsResponse = require('../responses/statsResponse');

class StatsService {
    constructor() {
        this.playerRepository = new PlayerRepository();
    }

    async getStats(filterRequest) {
        let statsResponse = new StatsResponse();

        if ('batting' === filterRequest.type) {
            statsResponse = await this.playerRepository.getBattingStats(filterRequest);
        } else if ('bowling' === filterRequest.type) {
            statsResponse = await this.playerRepository.getBowlingStats(filterRequest);
        } else if ('fielding' === filterRequest.type) {
            statsResponse = await this.playerRepository.getFieldingStats(filterRequest);
        }
        return statsResponse;
    }
}

module.exports = StatsService;
