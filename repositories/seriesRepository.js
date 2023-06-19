const connectDatabase = require('../config/database');
const mongoose = require('mongoose');
const { SeriesModel, Series } = require('../models/series');

class SeriesRepository {
    async create (createRequest) {
        await connectDatabase();

        const series = new Series(createRequest)

        const seriesModel = new SeriesModel(series);

        return await seriesModel.save();
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

    async update (series) {
        await connectDatabase();
        SeriesModel.updateOne({ _id: series._id }, series);
    }
}

module.exports = SeriesRepository;
