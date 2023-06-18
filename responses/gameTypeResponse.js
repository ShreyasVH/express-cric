class GameTypeResponse {
    constructor(gameType) {
        this.id = gameType._id;
        this.name = gameType.name;
    }
}

module.exports = GameTypeResponse;
