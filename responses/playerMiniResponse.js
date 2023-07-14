class PlayerMiniResponse {
    constructor(player, country) {
        this.id = player._id;
        this.name = player.name;
        this.country = country;
        this.dateOfBirth = player.dateOfBirth;
        this.image = player.image;
    }
}

module.exports = PlayerMiniResponse;
