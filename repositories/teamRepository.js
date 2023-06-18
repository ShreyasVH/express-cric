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

  async findAll(page, limit) {
    await connectDatabase();

    return TeamModel.find().sort({ 'name': 1 }).skip((page - 1) * limit).limit(limit);
  }

  async getTotalCount() {
    return TeamModel.countDocuments();
  }

  async getByIds (ids) {
    await connectDatabase();

    return TeamModel.find({ _id: { $in: ids } });
  }
}

module.exports = TeamRepository;
