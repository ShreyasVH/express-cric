const ManOfTheSeriesRepository = require('../repositories/manOfTheSeriesRepository');

class ManOfTheSeriesService {
    constructor() {
        this.manOfTheSeriesRepository = new ManOfTheSeriesRepository();
    }

    async add (seriesId, playerIds, session) {
        return this.manOfTheSeriesRepository.add(seriesId, playerIds, session);
    }

    async getBySeriesIds (seriesIds) {
        return this.manOfTheSeriesRepository.getBySeriesIds(seriesIds);
    }

    async removePlayers (seriesId, playerIds, session) {
        await this.manOfTheSeriesRepository.removePlayers(seriesId, playerIds, session);
    }

    async remove (seriesId) {
        await this.manOfTheSeriesRepository.remove(seriesId);
    }
}

module.exports = ManOfTheSeriesService;
