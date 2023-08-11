const WinMarginTypeResponse = require('./winMarginTypeResponse');

class MatchResponse {
    constructor(match, team1, team2, resultType, winMarginType, stadium) {
        this.id = match._id;
        this.team1 = team1;
        this.team2 = team2;
        const teamMap = {
            [team1.id]: team1,
            [team2.id]: team2
        };

        let winner = null;
        let winMargin = null;
        let winMarginTypeResponse = null;
        if (match.winnerId) {
            winner = teamMap[match.winnerId];
            winMargin = match.winMargin;
            winMarginTypeResponse = new WinMarginTypeResponse(winMarginType);
        }
        this.winner = winner;
        this.winMargin = winMargin;
        this.winMarginType = winMarginTypeResponse;

        this.resultType = resultType;
        this.stadium = stadium;
        this.startTime = match.startTime;
    }
}

module.exports = MatchResponse;
