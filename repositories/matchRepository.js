const connectDatabase = require('../config/database');
const { MatchModel, Match } = require('../models/match');

class MatchRepository {
    async create (createRequest, session) {
        await connectDatabase();

        const match = new Match(createRequest)

        const matchModel = new MatchModel(match);

        return await matchModel.save({ session });
    }

    async findByStadiumAndStartTime (stadiumId, startTime) {
        await connectDatabase();
        return MatchModel.findOne({ stadiumId, startTime });
    }

    async findBySeriesId (seriesId) {
        await connectDatabase();
        return MatchModel.find({ seriesId: seriesId }).sort({ startTime: 1 });
    }
}

module.exports = MatchRepository;
