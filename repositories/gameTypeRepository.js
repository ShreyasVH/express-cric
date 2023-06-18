const connectDatabase = require('../config/database');
const { GameTypeModel } = require('../models/gameType');

class GameTypeRepository {
    async findById (id) {
        await connectDatabase();
        return GameTypeModel.findOne({ _id: id });
    }
}

module.exports = GameTypeRepository;
