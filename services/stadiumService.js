const StadiumRepository = require('../repositories/stadiumRepository');
const ConflictException = require('../exceptions/conflictException');

class StadiumService {
  constructor() {
    this.stadiumRepository = new StadiumRepository();
  }

  async create(createRequest) {
    createRequest.validate();

    const existingStadium = await this.stadiumRepository.findByNameAndCountryId(createRequest.name, createRequest.countryId);
    if (null !== existingStadium) {
      throw new ConflictException('Stadium');
    }

    return await this.stadiumRepository.create(createRequest);
  }

  async getAll(page, limit) {
    return this.stadiumRepository.findAll(page, limit);
  }

  async getTotalCount() {
    return this.stadiumRepository.getTotalCount();
  }

  async findById (id) {
    return this.stadiumRepository.findById(id);
  }
}

module.exports = StadiumService;
