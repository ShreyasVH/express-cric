const connectDatabase = require('../config/database');
const { ResultTypeModel } = require('../models/resultType');

class ResultTypeRepository {
    async findById (id) {
        await connectDatabase();
        return ResultTypeModel.findOne({ _id: id });
    }
}

module.exports = ResultTypeRepository;
