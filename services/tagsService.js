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

    async findByIds (ids) {
        let tags = [];
        if (ids.length > 0) {
            tags = this.tagsRepository.findByIds(ids);
        }

        return tags;
    }
}

module.exports = TagsService;
