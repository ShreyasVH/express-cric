class FieldingStats {
    constructor(basicStats) {
        this.catches = basicStats['Caught'] ?? 0;
        this.runOuts = basicStats['Run Out'] ?? 0;
        this.stumpings = basicStats['Stumped'] ?? 0;
    }
}

module.exports = FieldingStats;
