class SeriesMiniResponse {
    constructor(series) {
        this.id = series._id;
        this.name = series.name;
        this.homeCountryId = series.homeCountryId;
        this.tourId = series.tourId;
        this.typeId = series.typeId;
        this.gameTypeId = series.gameTypeId;
        this.startTime = series.startTime;
    }
}

module.exports = SeriesMiniResponse;
