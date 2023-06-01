const TeamTypeRepository = require('../repositories/teamTypeRepository');

class TeamTypeService {
  constructor() {
    this.teamTypeRepository = new TeamTypeRepository();
  }

  async findById (id) {
    return this.teamTypeRepository.findById(id);
  }
}

module.exports = TeamTypeService;
