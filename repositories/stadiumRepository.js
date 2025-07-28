const { connectDatabase } = require('../config/database');
const { StadiumModel, Stadium } = require('../models/stadium');

class StadiumRepository {
  async create (createRequest) {
    await connectDatabase();

    const stadium = new Stadium(createRequest)

    const stadiumModel = new StadiumModel(stadium);

    return await stadiumModel.save();
  }

  async findByNameAndCountryIdAndCity (name, countryId, city) {
    await connectDatabase();
    return StadiumModel.findOne({ name, countryId, city });
  }

  async findAll(page, limit) {
    await connectDatabase();

    return StadiumModel.find().sort({ 'name': 1, '_id': 1 }).skip((page - 1) * limit).limit(limit);
  }

  async getTotalCount() {
    return StadiumModel.countDocuments();
  }

  async findById (id) {
    await connectDatabase();
    return StadiumModel.findOne({ _id: id });
  }

  async findByIds (ids) {
    await connectDatabase();
    return StadiumModel.find({ _id: { $in: ids } });
  }
}

module.exports = StadiumRepository;
