const { connectDatabase } = require('../config/database');
const { ResultTypeModel } = require('../models/resultType');

class ResultTypeRepository {
    async findById (id) {
        await connectDatabase();
        return ResultTypeModel.findOne({ _id: id });
    }

    async findByIds (ids) {
        await connectDatabase();
        return ResultTypeModel.find({ _id: { $in: ids } });
    }
}

module.exports = ResultTypeRepository;
