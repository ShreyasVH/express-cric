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

    async remove (seriesId, playerIds, session) {
        await this.manOfTheSeriesRepository.remove(seriesId, playerIds, session);
    }
}

module.exports = ManOfTheSeriesService;
