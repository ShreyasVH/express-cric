const CreateRequest = require('../requests/players/createRequest');
const { asyncHandler, ok, created } = require('./base.js');
const PlayerService = require('../services/playerService');
const CountryService = require('../services/countryService');
const PlayerResponse = require('../responses/playerResponse');
const CountryResponse = require('../responses/countryResponse');
const PaginatedResponse = require('../responses/paginatedResponse');
const NotFoundException = require('../exceptions/notFoundException');

const playerService = new PlayerService();
const countryService = new CountryService();

const create = asyncHandler(async (req, res, next) => {
    const createRequest = new CreateRequest(req.body);

    const country = await countryService.findById(createRequest.countryId);
    if (null == country) {
        throw new NotFoundException('Country');
    }

    const player = await playerService.create(createRequest);
    created(res, new PlayerResponse(player, new CountryResponse(country)));
});

const getAll = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const players = await playerService.getAll(page, limit);
    const countryIds = players.map(team => team.countryId);
    const countries = await countryService.findByIds(countryIds);
    const countryMap = countries.reduce((object, current) => {
        object[current._id] = current;
        return object;
    }, {});

    const playerResponses = players.map(player => new PlayerResponse(player, new CountryResponse(countryMap[player.countryId])));
    let totalCount = 0;
    if (page === 1) {
        totalCount = await playerService.getTotalCount();
    }
    ok(res, new PaginatedResponse(totalCount, playerResponses, page, limit));
});

module.exports = {
    create,
    getAll
};
