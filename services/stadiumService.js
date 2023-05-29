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
}

module.exports = StadiumService;
