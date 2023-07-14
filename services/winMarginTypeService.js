const WinMarginTypeRepository = require('../repositories/winMarginTypeRepository');

class WinMarginTypeService {
    constructor() {
        this.winMarginTypeRepository = new WinMarginTypeRepository();
    }

    async findById (id) {
        return this.winMarginTypeRepository.findById(id);
    }
}

module.exports = WinMarginTypeService;
