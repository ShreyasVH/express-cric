const connectDatabase = require('../config/database');
const { TeamModel, Team } = require('../models/team');

class TeamRepository {
  async create (createRequest) {
    await connectDatabase();

    const team = new Team(createRequest)

    const teamModel = new TeamModel(team);

    return await teamModel.save();
  }

  async findByNameAndCountryIdAndTypeId (name, countryId, typeId) {
    await connectDatabase();
    return TeamModel.findOne({ name, countryId, typeId });
  }
}

module.exports = TeamRepository;
