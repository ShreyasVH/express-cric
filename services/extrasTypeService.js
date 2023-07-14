const ExtrasTypeRepository = require('../repositories/extrasTypeRepository');

class ExtrasTypeService {
    constructor() {
        this.extrasTypeRepository = new ExtrasTypeRepository();
    }

    async getAll () {
        return this.extrasTypeRepository.getAll();
    }
}

module.exports = ExtrasTypeService;
