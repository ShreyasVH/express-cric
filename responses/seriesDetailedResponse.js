const SeriesTypeResponse = require('./seriesTypeResponse');
const GameTypeResponse = require('./gameTypeResponse');

class SeriesDetailedResponse {
    constructor(series, seriesType, gameType, teams, matches) {
        this.id = series._id;
        this.name = series.name;
        this.type = new SeriesTypeResponse(seriesType);
        this.gameType = new GameTypeResponse(gameType);
        this.startTime = series.startTime;
        this.tags = series.tags;
        this.teams = teams;
        this.matches = matches;
    }
}

module.exports = SeriesDetailedResponse;
