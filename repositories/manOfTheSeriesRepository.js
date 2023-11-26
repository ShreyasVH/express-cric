const connectDatabase = require('../config/database');
const { ManOfTheSeriesModel, ManOfTheSeries } = require('../models/manOfTheSeries');

class ManOfTheSeriesRepository {
    async add (seriesId, playerIds, session) {
        await connectDatabase();

        const manOfTheSeriesList = playerIds.map(playerId => new ManOfTheSeries(seriesId, playerId));

        if (manOfTheSeriesList.length > 0) {
            await ManOfTheSeriesModel.create(manOfTheSeriesList, { session });
        }
    }

    async getBySeriesIds (seriesIds) {
        await connectDatabase();

        return ManOfTheSeriesModel.find({ seriesId: { $in: seriesIds } });
    }

    async removePlayers (seriesId, playerIds, session) {
        await connectDatabase();

        if (playerIds.length > 0) {
            const manOfTheSeriesList = await ManOfTheSeriesModel.find({ seriesId: seriesId, playerId: { $in: playerIds } });
            const ids = manOfTheSeriesList.map(mots => mots._id);
            await ManOfTheSeriesModel.deleteMany({ _id: { $in: ids } }, { session });
        }
    }

    async remove (seriesId) {
        await connectDatabase();

        await ManOfTheSeriesModel.deleteMany({ seriesId: seriesId });
    }
}

module.exports = ManOfTheSeriesRepository;
