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

  async getByIds (ids) {
    return await this.tourRepository.getByIds(ids);
  }

  async getAllForYear(year, page, limit) {
    return this.tourRepository.findAllForYear(year, page, limit);
  }

  async getTotalCountForYear(year) {
    return this.tourRepository.getTotalCountForYear(year);
  }

  async getAllYears () {
    return this.tourRepository.getAllYears();
  }
}

module.exports = TourService;
