class BowlingStats {
    constructor(basicStats) {
        this.innings = basicStats.innings;
        this.balls = basicStats.balls;
        this.maidens = basicStats.maidens;
        this.runs = basicStats.runs;
        this.wickets = basicStats.wickets;
        this.fifers = basicStats.fifers;
        this.tenWickets = basicStats.tenWickets;
        this.average = null;
        this.strikeRate = null;
        this.economy = null;
    }
}

module.exports = BowlingStats;
