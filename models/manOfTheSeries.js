const mongoose = require('mongoose');

const manOfTheSeriesSchema = new mongoose.Schema({
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true }
},  { collection: 'manOfTheSeries' });

const ManOfTheSeriesModel = mongoose.model('ManOfTheSeries', manOfTheSeriesSchema);

class ManOfTheSeries {
    constructor (seriesId, playerId) {
        this.seriesId = seriesId;
        this.playerId = playerId;
    }
}

module.exports = {
    ManOfTheSeriesModel,
    ManOfTheSeries
};
