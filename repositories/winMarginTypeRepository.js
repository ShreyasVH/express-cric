const connectDatabase = require('../config/database');
const { WinMarginTypeModel } = require('../models/winMarginType');

class WinMarginTypeRepository {
    async findById (id) {
        await connectDatabase();
        return WinMarginTypeModel.findOne({ _id: id });
    }
}

module.exports = WinMarginTypeRepository;
