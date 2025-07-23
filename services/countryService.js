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

  async getAll(page, limit) {
    return this.countryRepository.findAll(page, limit);
  }

  async getTotalCount() {
    return this.countryRepository.getTotalCount();
  }

  async findById (id) {
    return this.countryRepository.findById(id);
  }

  async findByIds (ids) {
    let countries = [];
    if (ids.length > 0) {
      countries = this.countryRepository.findByIds(ids);
    }

    return countries;
  }
}

module.exports = CountryService;
