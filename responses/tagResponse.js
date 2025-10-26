class TagResponse {
    constructor(tag) {
        this.id = tag._id;
        this.name = tag.name;
    }
}

module.exports = TagResponse;
