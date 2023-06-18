const SeriesTypeRepository = require('../repositories/seriesTypeRepository');

class SeriesTypeService {
    constructor() {
        this.seriesTypeRepository = new SeriesTypeRepository();
    }

    async findById (id) {
        return this.seriesTypeRepository.findById(id);
    }

    async findByIds (ids) {
        return this.seriesTypeRepository.findByIds(ids);
    }
}

module.exports = SeriesTypeService;
