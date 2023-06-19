class SeriesResponse {
    constructor(series, country, tour, seriesType, gameType, teams, playerResponses) {
        this.id = series._id;
        this.name = series.name;
        this.country = country;
        this.tour = tour;
        this.type = seriesType;
        this.gameType = gameType;
        this.startTime = series.startTime;
        this.teams = teams;
        this.manOfTheSeriesList = playerResponses;
    }
}

module.exports = SeriesResponse;
