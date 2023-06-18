const connectDatabase = require('../config/database');
const { SeriesTeamsMap, SeriesTeamsMapModel } = require('../models/seriesTeamsMap');

class SeriesTeamsMapRepository {
    async add(seriesId, teamIds) {
        await connectDatabase();

        const seriesTeamsMaps = teamIds.map(teamId => new SeriesTeamsMap(seriesId, teamId));
        return await SeriesTeamsMapModel.create(seriesTeamsMaps);
    }

    async getBySeriesIds (seriesIds) {
        await connectDatabase();

        return SeriesTeamsMapModel.find({ seriesId: { $in: seriesIds } });
    }
}

module.exports = SeriesTeamsMapRepository;
