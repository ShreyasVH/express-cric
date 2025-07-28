const { connectDatabase } = require('../config/database');
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

        return PlayerModel.find().sort({ 'name': 1, '_id': 1 }).skip((page - 1) * limit).limit(limit);
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

    async remove (id) {
        await connectDatabase();
        await PlayerModel.deleteOne({ _id: id });
    }

    async search(keyword, page, limit) {
        await connectDatabase();

        return PlayerModel.find({
            name: { $regex: keyword, $options: "i" }
        }).sort({ 'name': 1, '_id': 1 }).skip((page - 1) * limit).limit(limit);
    }

    async searchCount(keyword) {
        await connectDatabase();

        return PlayerModel.countDocuments({
            name: { $regex: keyword, $options: "i" }
        });
    }
}

module.exports = PlayerRepository;
