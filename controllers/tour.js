const CreateRequest = require('../requests/tours/createRequest');
const { asyncHandler, ok, created } = require('./base.js');
const TourService = require('../services/tourService');
const TourResponse = require('../responses/tourResponse');
const Response = require('../responses/response');
const PaginatedResponse = require('../responses/paginatedResponse');

const tourService = new TourService();

const create = asyncHandler(async (req, res, next) => {
  const createRequest = new CreateRequest(req.body);
  const tour = await tourService.create(createRequest);
  created(res, new TourResponse(tour));
});

const getAllForYear = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const year = req.params.year;
  const tours = await tourService.getAllForYear(year, page, limit);

  const tourResponses = tours.map(tour => new TourResponse(tour));
  let totalCount = 0;
  if (page === 1) {
    totalCount = await tourService.getTotalCountForYear(year);
  }
  ok(res, new PaginatedResponse(totalCount, tourResponses, page, limit));
});

module.exports = {
  create,
  getAllForYear
};
