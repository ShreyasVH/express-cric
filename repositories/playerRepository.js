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
}

module.exports = PlayerRepository;
