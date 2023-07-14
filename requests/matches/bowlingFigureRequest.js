class BowlingFigureRequest {
    constructor(requestBody) {
        this.playerId = requestBody.playerId;
        this.balls = requestBody.balls;
        this.maidens = requestBody.maidens;
        this.runs = requestBody.runs;
        this.wickets = requestBody.wickets;
        this.innings = requestBody.innings;
    }
}

module.exports = BowlingFigureRequest;
