const TeamRepository = require('../repositories/teamRepository');
const ConflictException = require('../exceptions/conflictException');

class TeamService {
  constructor() {
    this.teamRepository = new TeamRepository();
  }

  async create(createRequest) {
    createRequest.validate();

    const existingTeam = await this.teamRepository.findByNameAndCountryIdAndTypeId(createRequest.name, createRequest.countryId, createRequest.typeId);
    if (null !== existingTeam) {
      throw new ConflictException('Team');
    }

    return await this.teamRepository.create(createRequest);
  }

  async getAll(page, limit) {
    return this.teamRepository.findAll(page, limit);
  }

  async getTotalCount() {
    return this.teamRepository.getTotalCount();
  }
}

module.exports = TeamService;
