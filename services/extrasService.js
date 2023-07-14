const ExtrasRepository = require('../repositories/extrasRepository');

class ExtrasService {
    constructor() {
        this.extrasRepository = new ExtrasRepository();
    }

    async add(matchId, extrasRequests, session) {
        return this.extrasRepository.add(matchId, extrasRequests, session);
    }
}

module.exports = ExtrasService;
