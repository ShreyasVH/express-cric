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

    async getAll(page, limit) {
        return this.playerRepository.findAll(page, limit);
    }

    async getTotalCount() {
        return this.playerRepository.getTotalCount();
    }

    async getByIds (ids) {
        return this.playerRepository.findByIds(ids);
    }

    async getById (id) {
        return this.playerRepository.findById(id);
    }

    async remove (id) {
        await this.playerRepository.remove(id);
    }
}

module.exports = PlayerService;
