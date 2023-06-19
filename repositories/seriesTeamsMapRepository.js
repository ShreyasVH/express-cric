const connectDatabase = require('../config/database');
const { SeriesTeamsMap, SeriesTeamsMapModel } = require('../models/seriesTeamsMap');

class SeriesTeamsMapRepository {
    async add(seriesId, teamIds) {
        await connectDatabase();

        const seriesTeamsMaps = teamIds.map(teamId => new SeriesTeamsMap(seriesId, teamId));
        return SeriesTeamsMapModel.create(seriesTeamsMaps);
    }

    async getBySeriesIds (seriesIds) {
        await connectDatabase();

        return SeriesTeamsMapModel.find({ seriesId: { $in: seriesIds } });
    }

    async remove (seriesId, teamIds) {
        await connectDatabase();

        const seriesTeamsMaps = await SeriesTeamsMapModel.find({ seriesId: seriesId, teamId: { $in: teamIds } });
        const ids = seriesTeamsMaps.map(stm => stm._id);
        SeriesTeamsMapModel.deleteMany({ _id: { $in: ids } });
    }
}

module.exports = SeriesTeamsMapRepository;
