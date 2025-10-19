const { asyncHandler, ok } = require('./base.js');
const TagsService = require('../services/tagsService');
const PaginatedResponse = require('../responses/paginatedResponse');

const tagsService = new TagsService();

const getAll = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const tags = await tagsService.getAll(page, limit);
    let totalCount = 0;
    if (page === 1) {
        totalCount = await tagsService.getTotalCount();
    }
    ok(res, new PaginatedResponse(totalCount, tags, page, limit));
});

module.exports = {
    getAll
};
