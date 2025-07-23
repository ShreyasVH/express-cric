const mongoose = require('mongoose');

const { CounterModel } = require('./counter');
const { dateTimeSchema } = require('./schemaExtensions');

const seriesSchema = new mongoose.Schema({
    // _id: { type: Number },
    name: { type: String, required: true },
    homeCountryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    typeId: { type: Number, required: true },
    gameTypeId: { type: Number, required: true },
    startTime: dateTimeSchema
},  { collection: 'series' });

// seriesSchema.pre('save', async function (next) {
//     const series = this;
//     try {
//         const counter = await CounterModel.findByIdAndUpdate(
//             'series',
//             { $inc: { sequenceValue: 1 } },
//             { new: true, upsert: true }
//         );
//         series._id = counter.sequenceValue;
//         next();
//     } catch (error) {
//         console.error('Failed to generate series ID:', error);
//         throw error;
//     }
// });

const SeriesModel = mongoose.model('Series', seriesSchema);

class Series {
    constructor(createRequest) {
        this.name = createRequest.name;
        this.homeCountryId = createRequest.homeCountryId;
        this.tourId = createRequest.tourId;
        this.typeId = createRequest.typeId;
        this.gameTypeId = createRequest.gameTypeId;
        this.startTime = createRequest.startTime;
    }
}

module.exports = {
    SeriesModel,
    Series
};
