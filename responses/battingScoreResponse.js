class BattingScoreResponse {
    constructor(battingScore, player, dismissalMode, bowler, fielders) {
        this.id = battingScore._id;
        this.player = player;
        this.runs = battingScore.runs;
        this.balls = battingScore.balls;
        this.fours = battingScore.fours;
        this.sixes = battingScore.sixes;
        this.dismissalMode = dismissalMode ?? null;
        this.bowler = bowler;
        this.fielders = fielders;
        this.innings = battingScore.innings;
        this.number = battingScore.number ?? null;
    }
}

module.exports = BattingScoreResponse;
