class SeriesTypeResponse {
    constructor(seriesType) {
        this.id = seriesType._id;
        this.name = seriesType.name;
    }
}

module.exports = SeriesTypeResponse;
