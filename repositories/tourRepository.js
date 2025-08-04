const { connectDatabase } = require('../config/database');
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

  async getById (id) {
    await connectDatabase();
    return TourModel.findOne({ _id: id });
  }

  async getByIds (ids) {
    await connectDatabase();
    return TourModel.find({ _id: { $in: ids } });
  }

  async findAllForYear(year, page, limit) {
    await connectDatabase();

    const startOfYear = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
    const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59));

    return TourModel.find({
      startTime: {
        $gte: startOfYear,
        $lte: endOfYear
      }
    }).sort({ 'startTime': -1 }).skip((page - 1) * limit).limit(limit);
  }

  async getTotalCountForYear(year) {
    await connectDatabase();

    const startOfYear = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
    const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59));

    return TourModel.countDocuments({
      startTime: {
        $gte: startOfYear,
        $lte: endOfYear
      }
    });
  }

  async getAllYears () {
    await connectDatabase();

    const years = [];

    const result = await TourModel.aggregate([
      { $group: { _id: { $year: '$startTime' } } },
      { $project: { year: '$_id', _id: 0 } },
      { $sort: { year: -1 } }
    ]);

    for (const row of result) {
      years.push(row.year);
    }

    return years;
  }
}

module.exports = TourRepository;
