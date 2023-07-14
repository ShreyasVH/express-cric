const connectDatabase = require('../config/database');
const { DismissalModeModel } = require('../models/dismissalMode');

class DismissalModeRepository {
    async getAll () {
        await connectDatabase();
        return DismissalModeModel.find({});
    }
}

module.exports = DismissalModeRepository;
