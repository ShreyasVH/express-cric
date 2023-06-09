class PlayerMiniResponse {
    constructor(player) {
        this.id = player._id;
        this.name = player.name;
        this.dateOfBirth = player.dateOfBirth;
        this.image = player.image;
        this.dismissalStats = {};
        this.battingStats = {};
        this.bowlingStats = {};
        this.fieldingStats = {};
    }
}

module.exports = PlayerMiniResponse;
