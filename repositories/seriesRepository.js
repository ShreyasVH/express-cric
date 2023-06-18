const connectDatabase = require('../config/database');
const { SeriesModel, Series } = require('../models/series');

class SeriesRepository {
    async create (createRequest) {
        await connectDatabase();

        const series = new Series(createRequest)

        const seriesModel = new SeriesModel(series);

        return await seriesModel.save();
    }

    async findByNameAndTourIdAndGameTypeId (name, tourId, gameTypeId) {
        await connectDatabase();
        return SeriesModel.findOne({ name, tourId, gameTypeId });
    }

    async findAll(page, limit) {
        await connectDatabase();

        return SeriesModel.find().sort({ 'name': 1 }).skip((page - 1) * limit).limit(limit);
    }

    async getTotalCount() {
        return SeriesModel.countDocuments();
    }
}

module.exports = SeriesRepository;
