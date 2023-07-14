class ExtrasRequest {
    constructor(requestBody) {
        this.typeId = requestBody.typeId;
        this.runs = requestBody.runs;
        this.battingTeamId = requestBody.battingTeamId;
        this.bowlingTeamId = requestBody.bowlingTeamId;
        this.innings = requestBody.innings;
    }
}

module.exports = ExtrasRequest;
