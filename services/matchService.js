const MatchRepository = require('../repositories/matchRepository');
const ConflictException = require('../exceptions/conflictException');

class MatchService {
    constructor() {
        this.matchRepository = new MatchRepository();
    }

    async create(createRequest, session) {
        createRequest.validate();

        const existingMatch = await this.matchRepository.findByStadiumAndStartTime(createRequest.stadiumId, createRequest.startTime);
        if (null !== existingMatch) {
            throw new ConflictException('Match');
        }

        return await this.matchRepository.create(createRequest, session);
    }
}

module.exports = MatchService;
