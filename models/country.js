const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const CountryModel = mongoose.model('Country', countrySchema);

class Country {
  constructor(createRequest) {
    this.name = createRequest.name;
  }
}

module.exports = {
  CountryModel,
  Country
};
