const connectDatabase = require('../config/database');
const { SeriesTypeModel } = require('../models/seriesType');

class SeriesTypeRepository {
    async findById (id) {
        await connectDatabase();
        return SeriesTypeModel.findOne({ _id: id });
    }
}

module.exports = SeriesTypeRepository;
