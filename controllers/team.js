const CreateRequest = require('../requests/teams/createRequest');
const { asyncHandler, ok, created } = require('./base.js');
const TeamService = require('../services/teamService');
const CountryService = require('../services/countryService');
const TeamTypeService = require('../services/teamTypeService');
const TeamResponse = require('../responses/teamResponse');
const CountryResponse = require('../responses/countryResponse');
const TeamTypeResponse = require('../responses/teamTypeResponse');
const NotFoundException = require('../exceptions/notFoundException');
const PaginatedResponse = require('../responses/paginatedResponse');

const teamService = new TeamService();
const countryService = new CountryService();
const teamTypeService = new TeamTypeService();

const create = asyncHandler(async (req, res, next) => {
  const createRequest = new CreateRequest(req.body);

  const country = await countryService.findById(createRequest.countryId);
  if (null == country) {
    throw new NotFoundException('Country');
  }

  const teamType = await teamTypeService.findById(createRequest.typeId);
  if (null == teamType) {
    throw new NotFoundException('Team type');
  }

  const team = await teamService.create(createRequest);
  created(res, new TeamResponse(team, new CountryResponse(country), new TeamTypeResponse(teamType)));
});



module.exports = {
  create
};
