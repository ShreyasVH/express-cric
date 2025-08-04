const { connectDatabase } = require('../config/database');
const { GameTypeModel } = require('../models/gameType');

class GameTypeRepository {
    async findById (id) {
        await connectDatabase();
        return GameTypeModel.findOne({ _id: id });
    }

    async findByIds (ids) {
        await connectDatabase();
        return GameTypeModel.find({ _id: { $in: ids } });
    }
}

module.exports = GameTypeRepository;
