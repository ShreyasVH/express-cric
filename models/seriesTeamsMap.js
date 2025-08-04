const mongoose = require('mongoose');

const seriesTeamsMapSchema = new mongoose.Schema({
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }
},  { collection: 'series_teams_map' });

const SeriesTeamsMapModel = mongoose.model('SeriesTeamsMap', seriesTeamsMapSchema);

class SeriesTeamsMap {
    constructor(seriesId, teamId) {
        this.seriesId = seriesId;
        this.teamId = teamId;
    }
}

module.exports = {
    SeriesTeamsMapModel,
    SeriesTeamsMap
};
