const SeriesRepository = require('../repositories/seriesRepository');
const ConflictException = require('../exceptions/conflictException');

class SeriesService {
    constructor() {
        this.seriesRepository = new SeriesRepository();
    }

    async create(createRequest) {
        createRequest.validate();

        const existingSeries = await this.seriesRepository.findByNameAndTourIdAndGameTypeId(createRequest.name, createRequest.tourId, createRequest.gameTypeId);
        if (null !== existingSeries) {
            throw new ConflictException('Series');
        }

        return await this.seriesRepository.create(createRequest);
    }

    async getAll(page, limit) {
        return this.seriesRepository.findAll(page, limit);
    }

    async getTotalCount() {
        return this.seriesRepository.getTotalCount();
    }
}

module.exports = SeriesService;
