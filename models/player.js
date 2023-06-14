const mongoose = require('mongoose');

const { dateSchema } = require('./schemaExtensions');

const { CounterModel } = require('./counter');

const playerSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    countryId: { type: Number, required: true },
    dateOfBirth: dateSchema,
    image: { type: String }
}, { collection: 'players' });

playerSchema.pre('save', async function (next) {
    const player = this;
    try {
        const counter = await CounterModel.findByIdAndUpdate(
            'players',
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        player._id = counter.sequenceValue;
        next();
    } catch (error) {
        console.error('Failed to generate player ID:', error);
        throw error;
    }
});

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
