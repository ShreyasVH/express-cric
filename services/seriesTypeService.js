const SeriesTypeRepository = require('../repositories/seriesTypeRepository');

class SeriesTypeService {
    constructor() {
        this.seriesTypeRepository = new SeriesTypeRepository();
    }

    async findById (id) {
        return this.seriesTypeRepository.findById(id);
    }
}

module.exports = SeriesTypeService;
