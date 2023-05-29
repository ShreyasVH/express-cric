const CreateRequest = require('../requests/stadiums/createRequest');
const { asyncHandler, ok, created } = require('./base.js');
const StadiumService = require('../services/stadiumService');
const CountryService = require('../services/countryService');
const StadiumResponse = require('../responses/stadiumResponse');
const CountryResponse = require('../responses/countryResponse');
const NotFoundException = require('../exceptions/notFoundException');

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

module.exports = {
  create
};
