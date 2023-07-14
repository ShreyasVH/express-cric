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

    async remove (seriesId, teamIds, session) {
        await this.seriesTeamsMapRepository.remove(seriesId, teamIds, session);
    }
}

module.exports = SeriesTeamsMapService;
