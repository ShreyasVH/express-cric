const CreateRequest = require('../requests/countries/createRequest');
const { asyncHandler, ok, created } = require('./base.js');
const CountryService = require('../services/countryService');
const CountryResponse = require('../responses/countryResponse');
const Response = require('../responses/response');
const PaginatedResponse = require('../responses/paginatedResponse');

const countryService = new CountryService();

const create = asyncHandler(async (req, res, next) => {
  const createRequest = new CreateRequest(req.body);
  const country = await countryService.create(createRequest);
  created(res, new CountryResponse(country));
});

const searchByName = asyncHandler(async (req, res, next) => {
  const countries = await countryService.searchByName(req.params.name);
  const countryResponses = countries.map(country => new CountryResponse(country));
  ok(res, countryResponses);
});

const getAll = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const countries = await countryService.getAll(page, limit);
  const countryResponses = countries.map(country => new CountryResponse(country));
  let totalCount = 0;
  if (page === 1) {
    totalCount = await countryService.getTotalCount();
  }
  ok(res, new PaginatedResponse(totalCount, countryResponses, page, limit));
});

module.exports = {
  create,
  searchByName,
  getAll
};
