const connectDatabase = require('../config/database');
const { CountryModel, Country } = require('../models/country');

class CountryRepository {
  async create (createRequest) {
    await connectDatabase();

    const country = new Country(createRequest)

    const countryModel = new CountryModel(country);

    return await countryModel.save();
  }

  async findByName (name) {
    await connectDatabase();
    return CountryModel.findOne({ name });
  }

  async findByNamePattern (name) {
    await connectDatabase();
    const regex = new RegExp(name, 'i');

    return CountryModel.find({ name: regex });
  }

  async findAll(page, limit) {
    await connectDatabase();

    return CountryModel.find().sort({ 'name': 1 }).skip((page - 1) * limit).limit(limit);
  }

  async getTotalCount() {
    return CountryModel.countDocuments();
  }

  async findById (id) {
    await connectDatabase();
    return CountryModel.findOne({ _id: id });
  }
}

module.exports = CountryRepository;
