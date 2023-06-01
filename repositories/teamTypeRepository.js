const connectDatabase = require('../config/database');
const { TeamTypeModel } = require('../models/teamType');

class TeamTypeRepository {
  async findById (id) {
    await connectDatabase();
    return TeamTypeModel.findOne({ _id: id });
  }
}

module.exports = TeamTypeRepository;
