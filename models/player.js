const mongoose = require('mongoose');

const { dateSchema } = require('./schemaExtensions');

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    dateOfBirth: dateSchema,
    image: { type: String }
}, { collection: 'players' });

const PlayerModel = mongoose.model('Player', playerSchema);

class Player {
    constructor(createRequest) {
        this.name = createRequest.name;
        this.countryId = createRequest.countryId;
        this.dateOfBirth = createRequest.dateOfBirth;
        this.image = createRequest.image;
    }
}

module.exports = {
    PlayerModel,
    Player
};
