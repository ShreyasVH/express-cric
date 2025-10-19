const mongoose = require('mongoose');

const { dateTimeSchema } = require('./schemaExtensions');

const seriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    homeCountryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    typeId: { type: Number, required: true },
    gameTypeId: { type: Number, required: true },
    startTime: dateTimeSchema,
    tags: {type: Array, required: false}
},  { collection: 'series' });

const SeriesModel = mongoose.model('Series', seriesSchema);

class Series {
    constructor(createRequest, tags) {
        this.name = createRequest.name;
        this.homeCountryId = createRequest.homeCountryId;
        this.tourId = createRequest.tourId;
        this.typeId = createRequest.typeId;
        this.gameTypeId = createRequest.gameTypeId;
        this.startTime = createRequest.startTime;
        this.tags = tags
    }
}

module.exports = {
    SeriesModel,
    Series
};
