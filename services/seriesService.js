const SeriesRepository = require('../repositories/seriesRepository');
const ConflictException = require('../exceptions/conflictException');

class SeriesService {
    constructor() {
        this.seriesRepository = new SeriesRepository();
    }

    async create(createRequest, session) {
        createRequest.validate();

        const existingSeries = await this.seriesRepository.findByNameAndTourIdAndGameTypeId(createRequest.name, createRequest.tourId, createRequest.gameTypeId);
        if (null !== existingSeries) {
            throw new ConflictException('Series');
        }

        return await this.seriesRepository.create(createRequest, session);
    }

    async getAll(page, limit) {
        return this.seriesRepository.findAll(page, limit);
    }

    async getTotalCount() {
        return this.seriesRepository.getTotalCount();
    }

    async getById (id) {
        return this.seriesRepository.getById(id);
    }

    async update (existingSeries, updateRequest, session) {
        let isUpdateRequired = false;

        if (!!updateRequest.name && updateRequest.name !== existingSeries.name) {
            isUpdateRequired = true;
            existingSeries.name = updateRequest.name;
        }

        if (!!updateRequest.homeCountryId && updateRequest.homeCountryId !== existingSeries.homeCountryId) {
            isUpdateRequired = true;
            existingSeries.homeCountryId = updateRequest.homeCountryId;
        }

        if (!!updateRequest.tourId && updateRequest.tourId !== existingSeries.tourId) {
            isUpdateRequired = true;
            existingSeries.tourId = updateRequest.tourId;
        }

        if (!!updateRequest.typeId && updateRequest.typeId !== existingSeries.typeId) {
            isUpdateRequired = true;
            existingSeries.typeId = updateRequest.typeId;
        }

        if (!!updateRequest.gameTypeId && updateRequest.gameTypeId !== existingSeries.gameTypeId) {
            isUpdateRequired = true;
            existingSeries.gameTypeId = updateRequest.gameTypeId;
        }

        if (!!updateRequest.startTime && updateRequest.startTime !== existingSeries.startTime) {
            isUpdateRequired = true;
            existingSeries.startTime = updateRequest.startTime;
        }

        if (isUpdateRequired) {
            await this.seriesRepository.update(existingSeries, session);
        }

        return existingSeries;
    }
}

module.exports = SeriesService;
