class PartnershipRequest {
    constructor(requestBody) {
        this.innings = requestBody.innings;
        this.wicket = requestBody.wicket;
        this.runs = requestBody.runs;
        this.balls = requestBody.balls;
        this.ended = requestBody.ended;
        this.playerId1 = requestBody.playerId1;
        this.runs1 = requestBody.runs1;
        this.balls1 = requestBody.balls1;
        this.playerId2 = requestBody.playerId2;
        this.runs2 = requestBody.runs2;
        this.balls2 = requestBody.balls2;
    }
}

module.exports = PartnershipRequest;
