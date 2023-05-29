const CreateRequest = require('../requests/stadiums/createRequest');
const { asyncHandler, ok, created } = require('./base.js');
const StadiumService = require('../services/stadiumService');
const CountryService = require('../services/countryService');
const StadiumResponse = require('../responses/stadiumResponse');
const CountryResponse = require('../responses/countryResponse');
const NotFoundException = require('../exceptions/notFoundException');
const PaginatedResponse = require('../responses/paginatedResponse');

const stadiumService = new StadiumService();
const countryService = new CountryService();

const create = asyncHandler(async (req, res, next) => {
  const createRequest = new CreateRequest(req.body);

  const country = await countryService.findById(createRequest.countryId);
  if (null == country) {
    throw new NotFoundException('Country');
  }

  const stadium = await stadiumService.create(createRequest);
  created(res, new StadiumResponse(stadium, new CountryResponse(country)));
});

const getAll = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const stadiums = await stadiumService.getAll(page, limit);
  const countryIds = stadiums.map(stadium => stadium.countryId);
  const countries = await countryService.findByIds(countryIds);
  const countryMap = countries.reduce((object, current) => {
    object[current._id] = current;
    return object;
  }, {});

  const stadiumResponses = stadiums.map(stadium => new StadiumResponse(stadium, new CountryResponse(countryMap[stadium.countryId])));
  let totalCount = 0;
  if (page === 1) {
    totalCount = await stadiumService.getTotalCount();
  }
  ok(res, new PaginatedResponse(totalCount, stadiumResponses, page, limit));
});

module.exports = {
  create,
  getAll
};
