const TeamTypeRepository = require('../repositories/teamTypeRepository');

class TeamTypeService {
  constructor() {
    this.teamTypeRepository = new TeamTypeRepository();
  }

  async findById (id) {
    return this.teamTypeRepository.findById(id);
  }

  async findByIds (ids) {
    return this.teamTypeRepository.findByIds(ids);
  }
}

module.exports = TeamTypeService;
