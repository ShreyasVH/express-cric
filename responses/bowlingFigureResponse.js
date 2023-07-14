class BowlingFigureResponse {
    constructor(bowlingFigure, player) {
        this.id = bowlingFigure._id;
        this.player = player;
        this.balls = bowlingFigure.balls;
        this.maidens = bowlingFigure.maidens;
        this.runs = bowlingFigure.runs;
        this.wickets = bowlingFigure.wickets;
        this.innings = bowlingFigure.innings;
    }
}

module.exports = BowlingFigureResponse;
