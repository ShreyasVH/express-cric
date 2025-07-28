const CreateRequest = require('../requests/tours/createRequest');
const { asyncHandler, ok, created } = require('./base.js');
const TourService = require('../services/tourService');
const SeriesService = require('../services/seriesService');
const GameTypeService = require('../services/gameTypeService');
const TourMiniResponse = require('../responses/tourMiniResponse');
const TourResponse = require('../responses/tourResponse');
const SeriesMiniResponse = require('../responses/seriesMiniResponse');
const PaginatedResponse = require('../responses/paginatedResponse');
const NotFoundException = require('../exceptions/notFoundException');

const tourService = new TourService();
const seriesService = new SeriesService();
const gameTypeService = new GameTypeService();

const create = asyncHandler(async (req, res, next) => {
  const createRequest = new CreateRequest(req.body);
  const tour = await tourService.create(createRequest);
  created(res, new TourMiniResponse(tour));
});

const getAllForYear = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const year = req.params.year;
  const tours = await tourService.getAllForYear(year, page, limit);

  const tourResponses = tours.map(tour => new TourMiniResponse(tour));
  let totalCount = 0;
  if (page === 1) {
    totalCount = await tourService.getTotalCountForYear(year);
  }
  ok(res, new PaginatedResponse(totalCount, tourResponses, page, limit));
});

const getAllYears = asyncHandler(async (req, res, next) => {
  const years = await tourService.getAllYears();

  ok(res, years);
});

const getById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const tour = await tourService.getById(id);
  if (null == tour) {
    throw new NotFoundException('Tour');
  }

  const tourResponse = new TourResponse(tour);
  const seriesList = await seriesService.getByTourId(id);

  const gameTypeIds = seriesList.map(series => series.gameTypeId);
  const gameTypes = await gameTypeService.findByIds(gameTypeIds);
  const gameTypeMap = gameTypes.reduce((map, current) => {
    map[current.id] = current;
    return map;
  }, {});

  tourResponse.seriesList = seriesList.map(series => new SeriesMiniResponse(series, gameTypeMap[series.gameTypeId]));
  ok(res, tourResponse);
});

module.exports = {
  create,
  getAllForYear,
  getAllYears,
  getById
};
