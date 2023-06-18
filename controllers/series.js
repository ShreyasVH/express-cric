const CreateRequest = require('../requests/series/createRequest');
const { asyncHandler, ok, created } = require('./base.js');
const TeamService = require('../services/teamService');
const SeriesService = require('../services/seriesService');
const CountryService = require('../services/countryService');
const TeamTypeService = require('../services/teamTypeService');
const SeriesTypeService = require('../services/seriesTypeService');
const GameTypeService = require('../services/gameTypeService');
const TourService = require('../services/tourService');
const SeriesTeamsMapService = require('../services/seriesTeamsMapService');
const TeamResponse = require('../responses/teamResponse');
const SeriesResponse = require('../responses/seriesResponse');
const CountryResponse = require('../responses/countryResponse');
const TeamTypeResponse = require('../responses/teamTypeResponse');
const TourResponse = require('../responses/tourResponse');
const SeriesTypeResponse = require('../responses/seriesTypeResponse');
const GameTypeResponse = require('../responses/gameTypeResponse');
const NotFoundException = require('../exceptions/notFoundException');
const mongoose = require('mongoose');

const seriesService = new SeriesService();
const countryService = new CountryService();
const teamTypeService = new TeamTypeService();
const teamService = new TeamService();
const seriesTypeService = new SeriesTypeService();
const gameTypeService = new GameTypeService();
const seriesTeamsMapService = new SeriesTeamsMapService();
const tourService = new TourService();

const create = asyncHandler(async (req, res, next) => {
    const createRequest = new CreateRequest(req.body);

    const teams = await teamService.getByIds(createRequest.teams);
    if (teams.length !== createRequest.teams.filter((teamId, index, t) => t.indexOf(teamId) === index).length) {
        throw new NotFoundException('Team');
    }

    const teamTypeIds = [];
    const countryIds = [];
    for (const team of teams) {
        teamTypeIds.push(team.typeId);
        countryIds.push(team.countryId);
    }
    countryIds.push(createRequest.homeCountryId);
    const countries = await countryService.findByIds(countryIds);
    const countryMap = countries.reduce((map, country) => {
        map[country.id] = country;
        return map;
    }, {});

    const country = countryMap[createRequest.homeCountryId];
    if (null == country) {
        throw new NotFoundException('Country');
    }

    const tour = await tourService.getById(createRequest.tourId);
    if (null == tour) {
        throw new NotFoundException('Tour');
    }

    const seriesType = await seriesTypeService.findById(createRequest.typeId);
    if (null == seriesType) {
        throw new NotFoundException('Type');
    }

    const gameType = await gameTypeService.findById(createRequest.gameTypeId);
    if (null == gameType) {
        throw new NotFoundException('Game type');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    let series;
    try {
        series = await seriesService.create(createRequest);
        await seriesTeamsMapService.create(series._id, createRequest.teams);

        await session.commitTransaction();
        await session.endSession();
    } catch (e) {
        await session.endSession();
        throw e;
    }

    const teamTypes = await teamTypeService.findByIds(teamTypeIds);
    const teamTypeMap = teamTypes.reduce((map, teamType) => {
        map[teamType.id] = teamType;
        return map;
    }, {});

    const teamResponses = teams.map(team => new TeamResponse(team, new CountryResponse(country), new TeamTypeResponse(teamTypeMap[team.typeId])));
    created(res, new SeriesResponse(series, new CountryResponse(country), new TourResponse(tour), new SeriesTypeResponse(seriesType), new GameTypeResponse(gameType), teamResponses));
});

module.exports = {
    create
};
