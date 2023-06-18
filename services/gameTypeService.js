const GameTypeRepository = require('../repositories/gameTypeRepository');

class GameTypeService {
    constructor() {
        this.gameTypeRepository = new GameTypeRepository();
    }

    async findById (id) {
        return this.gameTypeRepository.findById(id);
    }

    async findByIds (ids) {
        return this.gameTypeRepository.findByIds(ids);
    }
}

module.exports = GameTypeService;
