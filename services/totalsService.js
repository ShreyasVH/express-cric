const TotalsRepository = require('../repositories/totalsRepository');

class TotalsService {
    constructor() {
        this.totalsRepository = new TotalsRepository();
    }

    async add(matchId, totalRequestEntries, session) {
        return this.totalsRepository.add(matchId, totalRequestEntries, session);
    }

    async remove (matchId) {
        await this.totalsRepository.remove(matchId);
    }
}

module.exports = TotalsService;
