const ExtrasRepository = require('../repositories/extrasRepository');

class ExtrasService {
    constructor() {
        this.extrasRepository = new ExtrasRepository();
    }

    async add(matchId, extrasRequests, session) {
        return this.extrasRepository.add(matchId, extrasRequests, session);
    }

    async getByMatchId (matchId) {
        return this.extrasRepository.getByMatchId(matchId);
    }
}

module.exports = ExtrasService;
