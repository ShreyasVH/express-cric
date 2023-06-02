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

module.exports = {
  create
};
