class BattingScoreRequest {
    constructor(requestBody) {
        this.playerId = requestBody.playerId;
        this.runs = requestBody.runs;
        this.balls = requestBody.balls;
        this.fours = requestBody.fours;
        this.sixes = requestBody.sixes;
        this.dismissalModeId = requestBody.dismissalModeId;
        this.bowlerId = requestBody.bowlerId;
        this.fielders = requestBody.fielderIds;
        this.innings = requestBody.innings;
        this.number = requestBody.number;
    }
}

module.exports = BattingScoreRequest;
