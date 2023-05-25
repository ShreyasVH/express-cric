const CreateRequest = require('../requests/countries/createRequest');
const { asyncHandler } = require('./base.js');
const CountryService = require('../services/countryService');
const CountryResponse = require('../responses/countryResponse');
const Response = require('../responses/response');

const countryService = new CountryService();

const create = asyncHandler(async (req, res, next) => {
  const createRequest = new CreateRequest(req.body);
  const country = await countryService.create(createRequest);
  res.json(Response.success(new CountryResponse(country)));
});

const searchByName = asyncHandler(async (req, res, next) => {
  const countries = await countryService.searchByName(req.params.name);
  const countryResponses = countries.map(country => new CountryResponse(country));
  res.json(Response.success(countryResponses));
});

module.exports = {
  create,
  searchByName
};
