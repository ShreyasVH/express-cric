const ManOfTheSeriesRepository = require('../repositories/manOfTheSeriesRepository');

class ManOfTheSeriesService {
    constructor() {
        this.manOfTheSeriesRepository = new ManOfTheSeriesRepository();
    }

    async add (seriesId, playerIds) {
        return this.manOfTheSeriesRepository.add(seriesId, playerIds);
    }

    async getBySeriesIds (seriesIds) {
        return this.manOfTheSeriesRepository.getBySeriesIds(seriesIds);
    }

    async remove (seriesId, playerIds) {
        await this.manOfTheSeriesRepository.remove(seriesId, playerIds);
    }
}

module.exports = ManOfTheSeriesService;
