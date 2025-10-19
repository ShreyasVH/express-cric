const TagsRepository = require('../repositories/TagsRepository');

class TagsService {
    constructor() {
        this.tagsRepository = new TagsRepository();
    }

    async getAll(page, limit) {
        return this.tagsRepository.findAll(page, limit);
    }

    async getTotalCount() {
        return this.tagsRepository.getTotalCount();
    }
}

module.exports = TagsService;
