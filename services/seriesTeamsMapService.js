const SeriesTeamsMapRepository = require('../repositories/seriesTeamsMapRepository');

class SeriesTeamsMapService {
    constructor() {
        this.seriesTeamsMapRepository = new SeriesTeamsMapRepository();
    }

    async create(seriesId, teamIds, session) {
        return this.seriesTeamsMapRepository.add(seriesId, teamIds, session);
    }

    async getBySeriesIds (seriesIds) {
        return this.seriesTeamsMapRepository.getBySeriesIds(seriesIds);
    }

    async removePlayers (seriesId, teamIds, session) {
        await this.seriesTeamsMapRepository.removePlayers(seriesId, teamIds, session);
    }

    async remove (seriesId) {
        await this.seriesTeamsMapRepository.remove(seriesId);
    }
}

module.exports = SeriesTeamsMapService;
