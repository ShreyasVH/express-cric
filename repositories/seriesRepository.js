const { connectDatabase } = require('../config/database');
const mongoose = require('mongoose');
const { SeriesModel, Series } = require('../models/series');

class SeriesRepository {
    async create (createRequest, tags, session) {
        await connectDatabase();

        const series = new Series(createRequest, tags)

        const seriesModel = new SeriesModel(series);

        return await seriesModel.save({ session, ordered: true });
    }

    async findByNameAndTourIdAndGameTypeId (name, tourId, gameTypeId) {
        await connectDatabase();
        return SeriesModel.findOne({ name, tourId, gameTypeId });
    }

    async findAll(page, limit) {
        await connectDatabase();

        return SeriesModel.find().sort({ 'name': 1 }).skip((page - 1) * limit).limit(limit);
    }

    async getTotalCount() {
        await connectDatabase();
        return SeriesModel.countDocuments();
    }

    async getById (id) {
        await connectDatabase();
        return SeriesModel.findOne({ _id: id });
    }

    async update (series, session) {
        await connectDatabase();
        SeriesModel.updateOne({ _id: series._id }, series, { session, ordered: true });
    }

    async getByTourId (tourId) {
        await connectDatabase();
        return SeriesModel.find({ tourId: tourId }).sort({ 'startTime': -1 });
    }

    async remove (id) {
        await connectDatabase();
        await SeriesModel.deleteOne({ _id: id });
    }
}

module.exports = SeriesRepository;
