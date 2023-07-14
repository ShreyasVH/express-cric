const SeriesMiniResponse = require('./seriesMiniResponse');

class MatchResponse {
    constructor(match, series, team1, team2, resultType, winMarginType, stadium, players, battingScores, bowlingFigures, extras, manOfTheMatchPlayerIds, captainPlayerIds, wicketKeeperIds) {
        this.id = match._id;
        this.series = new SeriesMiniResponse(series);
        this.team1 = team1;
        this.team2 = team2;
        const teamMap = {
            [team1.id]: team1,
            [team2.id]: team2
        };
        let tossWinner = null;
        let batFirst = null;
        if (match.tossWinnerId) {
            tossWinner = teamMap[match.tossWinnerId];
            batFirst = teamMap[match.batFirstId];
        }
        this.tossWinner = tossWinner;
        this.batFirst = batFirst;

        let winner = null;
        let winMargin = null;
        if (match.winnerId) {
            winner = teamMap[match.winnerId];
            winMargin = match.winMargin;
        }
        this.winner = winner;
        this.winMargin = winMargin;
        this.winMarginType = winMarginType;

        this.resultType = resultType;
        this.stadium = stadium;
        this.startTime = match.startTime;
        this.players = players;
        const playerMap = players.reduce((map, current) => {
            map[current.id] = current;
            return map;
        }, {});
        this.battingScores = battingScores;
        this.bowlingFigures = bowlingFigures;
        this.extras = extras;
        this.manOfTheMatchList = manOfTheMatchPlayerIds.map(playerId => playerMap[playerId]);
        this.captains = captainPlayerIds.map(playerId => playerMap[playerId]);
        this.wicketKeepers = wicketKeeperIds.map(playerId => playerMap[playerId]);
    }
}

module.exports = MatchResponse;
