const { connectDatabase } = require('../config/database');
const { ExtrasTypeModel } = require('../models/extrasType');

class ExtrasTypeRepository {
    async getAll () {
        await connectDatabase();
        return ExtrasTypeModel.find({});
    }
}

module.exports = ExtrasTypeRepository;
