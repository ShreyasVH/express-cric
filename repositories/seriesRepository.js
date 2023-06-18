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
}

module.exports = SeriesRepository;
