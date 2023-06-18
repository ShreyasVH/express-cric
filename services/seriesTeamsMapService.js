const SeriesTeamsMapRepository = require('../repositories/seriesTeamsMapRepository');

class SeriesTeamsMapService {
    constructor() {
        this.seriesTeamsMapRepository = new SeriesTeamsMapRepository();
    }

    async create(seriesId, teamIds) {
        return this.seriesTeamsMapRepository.add(seriesId, teamIds);
    }
}

module.exports = SeriesTeamsMapService;
