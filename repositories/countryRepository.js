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
}

module.exports = CountryRepository;
