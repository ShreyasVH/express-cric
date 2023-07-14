class ResultTypeResponse {
    constructor(resultType) {
        this.id = resultType._id;
        this.name = resultType.name;
    }
}

module.exports = ResultTypeResponse;
