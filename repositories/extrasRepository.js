const connectDatabase = require('../config/database');
const { ExtrasModel, Extras } = require('../models/extras');

class ExtrasRepository {
    async add (matchId, extrasRequests, session) {
        await connectDatabase();

        const addedEntries = [];
        for (const extrasRequest of extrasRequests) {
            const extras = new Extras(matchId, extrasRequest);
            const extrasModel = new ExtrasModel(extras);
            addedEntries.push(await extrasModel.save({ session }));
        }

        return addedEntries;
    }
}

module.exports = ExtrasRepository;
