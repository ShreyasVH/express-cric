const { connectDatabase } = require('../config/database');
const { TotalModel, Total } = require('../models/total');

class MatchPlayerMapRepository {
    async add (matchId, totalRequestEntries, session) {
        await connectDatabase();

        for (const totalRequestEntry of totalRequestEntries) {
            const total = new Total(matchId, totalRequestEntry);
            const totalModel = new TotalModel(total);
            await totalModel.save({ session });
        }
    }

    async remove (matchId) {
        await connectDatabase();

        await TotalModel.deleteMany({ matchId: matchId });
    }
}

module.exports = MatchPlayerMapRepository;
