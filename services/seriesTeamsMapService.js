const SeriesTeamsMapRepository = require('../repositories/seriesTeamsMapRepository');

class SeriesTeamsMapService {
    constructor() {
        this.seriesTeamsMapRepository = new SeriesTeamsMapRepository();
    }

    async create(seriesId, teamIds) {
        return this.seriesTeamsMapRepository.add(seriesId, teamIds);
    }

    async getBySeriesIds (seriesIds) {
        return this.seriesTeamsMapRepository.getBySeriesIds(seriesIds);
    }

    async remove (seriesId, teamIds) {
        await this.seriesTeamsMapRepository.remove(seriesId, teamIds);
    }
}

module.exports = SeriesTeamsMapService;
