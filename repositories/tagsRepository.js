const { connectDatabase } = require('../config/database');
const { TagModel } = require('../models/tag');

class CountryRepository {
    async findAll(page, limit) {
        await connectDatabase();

        return TagModel.find().sort({ 'name': 1 }).skip((page - 1) * limit).limit(limit);
    }

    async getTotalCount() {
        return TagModel.countDocuments();
    }
}

module.exports = CountryRepository;
