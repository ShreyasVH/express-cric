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

const getAll = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const teams = await teamService.getAll(page, limit);
  const countryIds = teams.map(team => team.countryId);
  const countries = await countryService.findByIds(countryIds);
  const countryMap = countries.reduce((object, current) => {
    object[current._id] = current;
    return object;
  }, {});
  const teamTypeIds = teams.map(team => team.typeId);
  const teamTypes = await teamTypeService.findByIds(teamTypeIds);
  const teamTypeMap = teamTypes.reduce((object, current) => {
    object[current._id] = current;
    return object;
  }, {});

  const teamResponses = teams.map(team => new TeamResponse(team, new CountryResponse(countryMap[team.countryId]), new TeamTypeResponse(teamTypeMap[team.typeId])));
  let totalCount = 0;
  if (page === 1) {
    totalCount = await teamService.getTotalCount();
  }
  ok(res, new PaginatedResponse(totalCount, teamResponses, page, limit));
});



module.exports = {
  create,
  getAll
};
