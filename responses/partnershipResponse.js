class PartnershipResponse {
    constructor(partnership, player1, player2) {
        this.id = partnership.id;
        this.innings = partnership.innings;
        this.wicket = partnership.wicket;
        this.balls = partnership.balls;
        this.runs = partnership.runs;
        this.ended = partnership.ended;
        this.player1 = new PlayerContribution(player1, partnership.runs1, partnership.balls1);
        this.player2 = new PlayerContribution(player2, partnership.runs2, partnership.balls2);
    }
}

class PlayerContribution {
    constructor(player, runs, balls) {
        this.player = player;
        this.runs = runs;
        this.balls = balls;
    }
}

module.exports = PartnershipResponse;
