const FilterRequest = require('../requests/filterRequest');
const { asyncHandler, ok, created } = require('./base.js');
const CountryService = require('../services/countryService');
const StatsResponse = require('../responses/statsResponse');
const Response = require('../responses/response');
const PaginatedResponse = require('../responses/paginatedResponse');

const countryService = new CountryService();

const getStats = asyncHandler(async (req, res, next) => {
    const filterRequest = new FilterRequest(req.body);
    ok(res, new StatsResponse(0, []));
});

module.exports = {
    getStats
};
