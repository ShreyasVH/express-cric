const connectDatabase = require('../config/database');
const { StadiumModel, Stadium } = require('../models/stadium');

class StadiumRepository {
  async create (createRequest) {
    await connectDatabase();

    const stadium = new Stadium(createRequest)

    const stadiumModel = new StadiumModel(stadium);

    return await stadiumModel.save();
  }

  async findByNameAndCountryId (name, countryId) {
    await connectDatabase();
    return StadiumModel.findOne({ name, countryId });
  }

  async findAll(page, limit) {
    await connectDatabase();

    return StadiumModel.find().sort({ 'name': 1 }).skip((page - 1) * limit).limit(limit);
  }

  async getTotalCount() {
    return StadiumModel.countDocuments();
  }
}

module.exports = StadiumRepository;
