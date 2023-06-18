const TourRepository = require('../repositories/tourRepository');
const ConflictException = require('../exceptions/conflictException');

class TourService {
  constructor() {
    this.tourRepository = new TourRepository();
  }

  async create(createRequest) {
    createRequest.validate();

    const existingTour = await this.tourRepository.findByNameAndStartTime(createRequest.name, createRequest.startTime);
    if (null !== existingTour) {
      throw new ConflictException('Tour');
    }

    return await this.tourRepository.create(createRequest);
  }

  async getById (id) {
    return await this.tourRepository.getById(id);
  }
}

module.exports = TourService;
