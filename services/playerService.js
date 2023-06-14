const PlayerRepository = require('../repositories/playerRepository');
const ConflictException = require('../exceptions/conflictException');

class PlayerService {
    constructor() {
        this.playerRepository = new PlayerRepository();
    }

    async create(createRequest) {
        createRequest.validate();

        const existingPlayer = await this.playerRepository.findByNameAndCountryIdAndDateOfBirth(createRequest.name, createRequest.countryId, createRequest.dateOfBirth);
        if (null !== existingPlayer) {
            throw new ConflictException('Player');
        }

        return await this.playerRepository.create(createRequest);
    }
}

module.exports = PlayerService;
