const ResultTypeRepository = require('../repositories/resultTypeRepository');

class ResultTypeService {
    constructor() {
        this.resultTypeRepository = new ResultTypeRepository();
    }

    async findById (id) {
        return this.resultTypeRepository.findById(id);
    }

    async findByIds (ids) {
        return this.resultTypeRepository.findByIds(ids);
    }
}

module.exports = ResultTypeService;
