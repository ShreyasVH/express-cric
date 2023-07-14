const connectDatabase = require('../config/database');
const { PlayerModel, Player } = require('../models/player');

class PlayerRepository {
    async create (createRequest) {
        await connectDatabase();

        const player = new Player(createRequest)

        const playerModel = new PlayerModel(player);

        return await playerModel.save();
    }

    async findByNameAndCountryIdAndDateOfBirth (name, countryId, dateOfBirth) {
        await connectDatabase();
        return PlayerModel.findOne({ name, countryId, dateOfBirth });
    }

    async findAll(page, limit) {
        await connectDatabase();

        return PlayerModel.find().sort({ 'name': 1 }).skip((page - 1) * limit).limit(limit);
    }

    async getTotalCount() {
        await connectDatabase();
        return PlayerModel.countDocuments();
    }

    async findByIds (ids) {
        await connectDatabase();
        return PlayerModel.find({ _id: { $in: ids } });
    }

    async findById (id) {
        await connectDatabase();
        return PlayerModel.findOne({ _id: id });
    }
}

module.exports = PlayerRepository;
