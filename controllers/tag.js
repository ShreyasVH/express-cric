const { asyncHandler, ok } = require('./base.js');
const TagsService = require('../services/tagsService');
const PaginatedResponse = require('../responses/paginatedResponse');
const TagResponse = require('../responses/tagResponse');

const tagsService = new TagsService();

const getAll = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const tags = await tagsService.getAll(page, limit);
    const tagResponses = tags.map(t => new TagResponse(t));
    let totalCount = 0;
    if (page === 1) {
        totalCount = await tagsService.getTotalCount();
    }
    ok(res, new PaginatedResponse(totalCount, tagResponses, page, limit));
});

module.exports = {
    getAll
};
