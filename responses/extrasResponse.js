class ExtrasResponse {
    constructor(extras, extrasType, battingTeam, bowlingTeam) {
        this.id = extras._id;
        this.runs = extras.runs;
        this.type = extrasType;
        this.battingTeam = battingTeam;
        this.bowlingTeam = bowlingTeam;
        this.innings = extras.innings;
    }
}

module.exports = ExtrasResponse;
