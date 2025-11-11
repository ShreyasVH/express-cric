const FilterRequest = require('../requests/filterRequest');
const { asyncHandler, ok, created } = require('./base.js');
const StatsService = require('../services/statsService');

const statsService = new StatsService();

const getStats = asyncHandler(async (req, res, next) => {
    const filterRequest = new FilterRequest(req.body);
    ok(res, await statsService.getStats(filterRequest));
});

module.exports = {
    getStats
};
