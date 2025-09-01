class TotalRequestEntry {
    constructor(requestBody) {
        this.teamId = requestBody.teamId;
        this.runs = requestBody.runs;
        this.wickets = requestBody.wickets;
        this.balls = requestBody.balls;
        this.innings = requestBody.innings;
    }
}

module.exports = TotalRequestEntry;
