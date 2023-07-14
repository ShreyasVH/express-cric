class BattingStats {
    constructor(basicStats) {
        this.innings = basicStats.innings;
        this.runs = basicStats.runs;
        this.balls = basicStats.balls;
        this.fours = basicStats.fours;
        this.sixes = basicStats.sixes;
        this.highest = basicStats.highest;
        this.fifties = basicStats.fifties;
        this.hundreds = basicStats.hundreds;
        this.twoHundreds = basicStats.twoHundreds;
        this.threeHundreds = basicStats.threeHundreds;
        this.fourHundreds = basicStats.fourHundreds;
        this.average = null;
        this.strikeRate = null;
        this.notOuts = 0;
    }
}

module.exports = BattingStats;
