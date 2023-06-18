const connectDatabase = require('../config/database');
const { SeriesTypeModel } = require('../models/seriesType');

class SeriesTypeRepository {
    async findById (id) {
        await connectDatabase();
        return SeriesTypeModel.findOne({ _id: id });
    }

    async findByIds (ids) {
        await connectDatabase();
        return SeriesTypeModel.find({ _id: { $in: ids } });
    }
}

module.exports = SeriesTypeRepository;
