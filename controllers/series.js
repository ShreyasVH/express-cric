const CreateRequest = require('../requests/series/createRequest');
const UpdateRequest = require('../requests/series/updateRequest');
const { asyncHandler, ok, created } = require('./base.js');
const TeamService = require('../services/teamService');
const SeriesService = require('../services/seriesService');
const CountryService = require('../services/countryService');
const TeamTypeService = require('../services/teamTypeService');
const SeriesTypeService = require('../services/seriesTypeService');
const GameTypeService = require('../services/gameTypeService');
const TourService = require('../services/tourService');
const SeriesTeamsMapService = require('../services/seriesTeamsMapService');
const ManOfTheSeriesService = require('../services/manOfTheSeriesService');
const PlayerService = require('../services/playerService');
const TeamResponse = require('../responses/teamResponse');
const SeriesResponse = require('../responses/seriesResponse');
const CountryResponse = require('../responses/countryResponse');
const TeamTypeResponse = require('../responses/teamTypeResponse');
const TourResponse = require('../responses/tourResponse');
const SeriesTypeResponse = require('../responses/seriesTypeResponse');
const GameTypeResponse = require('../responses/gameTypeResponse');
const PlayerResponse = require('../responses/playerResponse');
const PaginatedResponse = require('../responses/paginatedResponse');
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
const manOfTheSeriesService = new ManOfTheSeriesService();
const playerService = new PlayerService();

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
        series = await seriesService.create(createRequest, session);
        await seriesTeamsMapService.create(series._id, createRequest.teams, session);

        await session.commitTransaction();
        await session.endSession();
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        throw e;
    }

    const teamTypes = await teamTypeService.findByIds(teamTypeIds);
    const teamTypeMap = teamTypes.reduce((map, teamType) => {
        map[teamType.id] = teamType;
        return map;
    }, {});

    const teamResponses = teams.map(team => new TeamResponse(team, new CountryResponse(country), new TeamTypeResponse(teamTypeMap[team.typeId])));
    created(res, new SeriesResponse(series, new CountryResponse(country), new TourResponse(tour), new SeriesTypeResponse(seriesType), new GameTypeResponse(gameType), teamResponses, []));
});

const getAll = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const seriesList = await seriesService.getAll(page, limit);
    let totalCount = 0;
    if (page === 1) {
        totalCount = await seriesService.getTotalCount();
    }

    let countryIds = [];
    const seriesTypeIds = [];
    const gameTypeIds = [];
    const tourIds = [];
    const seriesIds = [];

    for (const series of seriesList) {
        countryIds.push(series.homeCountryId);
        seriesTypeIds.push(series.typeId);
        gameTypeIds.push(series.gameTypeId);
        tourIds.push(series.tourId);
        seriesIds.push(series._id);
    }

    const seriesTypes = await seriesTypeService.findByIds(seriesTypeIds);
    const seriesTypeMap = seriesTypes.reduce((map, seriesType) => {
        map[seriesType.id] = seriesType;
        return map;
    }, {});

    const gameTypes = await gameTypeService.findByIds(gameTypeIds);
    const gameTypeMap = gameTypes.reduce((map, gameType) => {
        map[gameType.id] = gameType;
        return map;
    }, {});

    const seriesTeamsMaps = await seriesTeamsMapService.getBySeriesIds(seriesIds);
    const teamIds = seriesTeamsMaps.map(seriesTeamsMap => seriesTeamsMap.teamId);

    const teams = await teamService.getByIds(teamIds);

    const teamTypeIds = [];
    for (const team of teams) {
        countryIds.push(team.countryId);
        teamTypeIds.push(team.typeId);
    }

    const manOfTheSeriesList = await manOfTheSeriesService.getBySeriesIds(seriesIds);
    const playerIds = manOfTheSeriesList.map(mots => mots.playerId);
    const players = await playerService.getByIds(playerIds);
    const playerCountryIds = players.map(player => player.countryId);
    countryIds = countryIds.concat(playerCountryIds);

    const countries = await countryService.findByIds(countryIds);
    const countryMap = countries.reduce((map, country) => {
        map[country.id] = country;
        return map;
    }, {});

    const teamTypes = await teamTypeService.findByIds(teamTypeIds);
    const teamTypeMap = teamTypes.reduce((map, teamType) => {
        map[teamType.id] = teamType;
        return map;
    }, {});

    const tours = await tourService.getByIds(tourIds);
    const tourMap = tours.reduce((map, tour) => {
        map[tour.id] = tour;
        return map;
    }, {});

    const teamResponses = teams.map(team => new TeamResponse(team, new CountryResponse(countryMap[team.countryId]), new TeamTypeResponse(teamTypeMap[team.typeId])));

    const playerResponses = players.map(player => new PlayerResponse(player, new CountryResponse(countryMap[player.countryId])));

    const seriesResponses = seriesList.map(series => new SeriesResponse(series, new CountryResponse(countryMap[series.homeCountryId]), new TourResponse(tourMap[series.tourId]), new SeriesTypeResponse(seriesTypeMap[series.typeId]), new GameTypeResponse(gameTypeMap[series.gameTypeId]), teamResponses, playerResponses));
    ok(res, new PaginatedResponse(totalCount, seriesResponses, page, limit));
});

const update = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const updateRequest = new UpdateRequest(req.body);

    const existingSeries = await seriesService.getById(id);
    if (!existingSeries) {
        throw new NotFoundException('Series');
    }

    const teamsToDelete = [];
    let teamsToAdd = [];
    const manOfTheSeriesToDelete = [];
    let manOfTheSeriesToAdd = [];
    let teams;
    const seriesTeamsMaps = await seriesTeamsMapService.getBySeriesIds([id]);
    const existingTeamIds = [];
    for (const seriesTeamsMap of seriesTeamsMaps) {
        existingTeamIds.push(seriesTeamsMap.teamId);
        if (!!updateRequest.teams && !updateRequest.teams.includes(seriesTeamsMap.teamId)) {
            teamsToDelete.push(seriesTeamsMap.teamId);
        }
    }

    if (!!updateRequest.teams) {
        teams = await teamService.getByIds(updateRequest.teams);
        if (teams.length !== updateRequest.teams.filter((teamId, index, t) => t.indexOf(teamId) === index).length) {
            throw new NotFoundException('Team');
        }

        teamsToAdd = updateRequest.teams.map(teamId => !existingTeamIds.includes(teamId));
    } else {
        teams = await teamService.getByIds(existingTeamIds);
    }

    const teamTypeIds = [];
    let countryIds = [];
    for (const team of teams) {
        teamTypeIds.push(team.typeId);
        countryIds.push(team.countryId);
    }

    if (!!updateRequest.homeCountryId) {
        countryIds.push(updateRequest.homeCountryId);
    } else {
        countryIds.push(existingSeries.homeCountryId);
    }

    let players;
    const manOfTheSeriesList = await manOfTheSeriesService.getBySeriesIds([id]);
    const existingPlayerIds = [];
    for (const manOfTheSeries of manOfTheSeriesList) {
        existingPlayerIds.push(manOfTheSeries.playerId);
        if (!!updateRequest.manOfTheSeriesList && !updateRequest.manOfTheSeriesList.includes(manOfTheSeries.playerId)) {
            manOfTheSeriesToDelete.push(manOfTheSeries.playerId);
        }
    }

    if (!!updateRequest.manOfTheSeriesList) {
        players = await playerService.getByIds(updateRequest.manOfTheSeriesList);
        if (players.length !== updateRequest.manOfTheSeriesList.filter((playerId, index, m) => m.indexOf(playerId) === index).length) {
            throw new NotFoundException('Player');
        }
        manOfTheSeriesToAdd = updateRequest.manOfTheSeriesList.filter(playerId => !existingPlayerIds.includes(playerId));
    } else {
        players = await playerService.getByIds(existingPlayerIds);
    }

    const playerCountryIds = players.map(player => player.countryId);
    countryIds = countryIds.concat(playerCountryIds);

    const countries = await countryService.findByIds(countryIds);
    const countryMap = countries.reduce((map, country) => {
        map[country.id] = country;
        return map;
    }, {});

    let homeCountryId;
    if (!!updateRequest.homeCountryId) {
        homeCountryId = updateRequest.homeCountryId;
    } else {
        homeCountryId = existingSeries.homeCountryId;
    }
    const country = countryMap[homeCountryId];
    if (null == country) {
        throw new NotFoundException('Home country');
    }

    let tourId;
    if (!!updateRequest.tourId) {
        tourId = updateRequest.tourId;
    } else {
        tourId = existingSeries.tourId;
    }
    const tour = await tourService.getById(tourId);
    if (null == tour) {
        throw new NotFoundException('Tour');
    }

    let seriesTypeId;
    if (!!updateRequest.typeId) {
        seriesTypeId = updateRequest.typeId;
    } else {
        seriesTypeId = existingSeries.typeId;
    }
    const seriesType = await seriesTypeService.findById(seriesTypeId);
    if (null == seriesType) {
        throw new NotFoundException('Type');
    }

    let gameTypeId;
    if (!!updateRequest.gameTypeId) {
        gameTypeId = updateRequest.gameTypeId;
    } else {
        gameTypeId = existingSeries.gameTypeId;
    }
    const gameType = await gameTypeService.findById(gameTypeId);
    if (null == gameType) {
        throw new NotFoundException('Game type');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    let series;
    try {
        series = await seriesService.update(existingSeries, updateRequest, session);
        await seriesTeamsMapService.create(series._id, teamsToAdd, session);
        await seriesTeamsMapService.remove(series._id, teamsToDelete, session);
        await manOfTheSeriesService.add(series._id, manOfTheSeriesToAdd, session);
        await manOfTheSeriesService.remove(series._id, manOfTheSeriesToDelete, session);

        await session.commitTransaction();
        await session.endSession();
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        throw e;
    }

    const teamTypes = await teamTypeService.findByIds(teamTypeIds);
    const teamTypeMap = teamTypes.reduce((map, teamType) => {
        map[teamType.id] = teamType;
        return map;
    }, {});

    const teamResponses = teams.map(team => new TeamResponse(team, new CountryResponse(country), new TeamTypeResponse(teamTypeMap[team.typeId])));

    const playerResponses = players.map(player => new PlayerResponse(player, new CountryResponse(countryMap[player.countryId])));
    created(res, new SeriesResponse(series, new CountryResponse(country), new TourResponse(tour), new SeriesTypeResponse(seriesType), new GameTypeResponse(gameType), teamResponses, playerResponses));
});

module.exports = {
    create,
    getAll,
    update
};
