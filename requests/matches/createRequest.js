class CreateRequest {
    constructor(requestBody) {
        this.seriesId = requestBody.seriesId;
        this.team1Id = requestBody.team1Id;
        this.team2Id = requestBody.team2Id;
        this.tossWinnerId = requestBody.tossWinnerId;
        this.batFirstId = requestBody.batFirstId;
        this.resultTypeId = requestBody.resultTypeId;
        this.winnerId = requestBody.winnerId;
        this.winMargin = requestBody.winMargin;
        this.winMarginTypeId = requestBody.winMarginTypeId;
        this.stadiumId = requestBody.stadiumId;
        this.startTime = requestBody.startTime;
        this.teams = requestBody.teams;
        this.isOfficial = requestBody.isOfficial ?? true;
        this.players = requestBody.players;
        this.bench = requestBody.bench;
        this.battingScores = requestBody.battingScores;
        this.bowlingFigures = requestBody.bowlingFigures;
        this.extras = requestBody.extras;
        this.manOfTheMatchList = requestBody.manOfTheMatchList;
        this.captains = requestBody.captains;
        this.wicketKeepers = requestBody.wicketKeepers;
        this.totals = requestBody.totals;
        this.tags = requestBody.tags;
    }

    validate () {
        
    }
}

module.exports = CreateRequest;
