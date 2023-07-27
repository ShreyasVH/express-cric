const GameTypeResponse = require('./gameTypeResponse');

class SeriesMiniResponse {
    constructor(series, gameType) {
        this.id = series._id;
        this.name = series.name;
        this.homeCountryId = series.homeCountryId;
        this.tourId = series.tourId;
        this.typeId = series.typeId;
        this.gameType = new GameTypeResponse(gameType);
        this.startTime = series.startTime;
    }
}

module.exports = SeriesMiniResponse;
