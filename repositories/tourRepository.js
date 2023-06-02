const connectDatabase = require('../config/database');
const { TourModel, Tour } = require('../models/tour');

class TourRepository {
  async create (createRequest) {
    await connectDatabase();

    const tour = new Tour(createRequest);

    const tourModel = new TourModel(tour);

    return await tourModel.save();
  }

  async findByNameAndStartTime (name, startTime) {
    await connectDatabase();
    return TourModel.findOne({ name, startTime });
  }
}

module.exports = TourRepository;
