const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const seriesTeamsMapSchema = new mongoose.Schema({
    // _id: { type: Number },
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }
},  { collection: 'series_teams_map' });

// seriesTeamsMapSchema.pre('save', async function (next) {
//     const seriesTeamsMap = this;
//     try {
//         const counter = await CounterModel.findByIdAndUpdate(
//             'series_teams_map',
//             { $inc: { sequenceValue: 1 } },
//             { new: true, upsert: true }
//         );
//         seriesTeamsMap._id = counter.sequenceValue;
//         next();
//     } catch (error) {
//         console.error('Failed to generate series teams map ID:', error);
//         throw error;
//     }
// });

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
