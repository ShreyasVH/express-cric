class TagResponse {
    constructor(tag) {
        this.id = tag._id;
        this.name = tag.name;
        this.type = tag.type;
    }
}

module.exports = TagResponse;
