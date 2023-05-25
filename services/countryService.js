const CountryRepository = require('../repositories/countryRepository');
const ConflictException = require('../exceptions/conflictException');

class CountryService {
  constructor() {
    this.countryRepository = new CountryRepository();
  }

  async create(createRequest) {
    createRequest.validate();

    const existingCountry = await this.countryRepository.findByName(createRequest.name);
    if (null !== existingCountry) {
      throw new ConflictException('Country');
    }

    return await this.countryRepository.create(createRequest);
  }

  async searchByName (name) {
    return this.countryRepository.findByNamePattern(name);
  }
}

module.exports = CountryService;
