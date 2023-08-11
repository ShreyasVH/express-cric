const WinMarginTypeRepository = require('../repositories/winMarginTypeRepository');

class WinMarginTypeService {
    constructor() {
        this.winMarginTypeRepository = new WinMarginTypeRepository();
    }

    async findById (id) {
        return this.winMarginTypeRepository.findById(id);
    }

    async findByIds (ids) {
        return this.winMarginTypeRepository.findByIds(ids);
    }
}

module.exports = WinMarginTypeService;
