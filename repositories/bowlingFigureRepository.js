const connectDatabase = require('../config/database');
const { BowlingFigureModel, BowlingFigure } = require('../models/bowlingFigure');

class BowlingFigureRepository {
    async add (bowlingFigureRequests, playerTeamMap, match, gameType, teamMap, teamTypeMap, session) {
        await connectDatabase();

        const addedEntries = [];
        for (const bowlingFigureRequest of bowlingFigureRequests) {
            const bowlingFigure = new BowlingFigure(bowlingFigureRequest, playerTeamMap, match, gameType, teamMap, teamTypeMap);
            const bowlingFigureModel = new BowlingFigureModel(bowlingFigure);
            addedEntries.push(await bowlingFigureModel.save({ session }));
        }

        return addedEntries;
    }

    async getBowlingStats (playerId) {
        await connectDatabase();

        const statsFinal = {};

        const result = await BowlingFigureModel.aggregate([
            { $match: { playerId: playerId, 'isOfficialMatch': true, 'teamType.name': 'International' } },
            {
                $group: {
                    _id: '$gameType.name',
                    innings: { $sum: 1 },
                    balls: { $sum: '$balls' },
                    maidens: { $sum: '$maidens' },
                    runs: { $sum: '$runs' },
                    wickets: { $sum: '$wickets' },
                    fifers: { $sum: { $cond: [{ $and: [{ $gte: ['$wickets', 5] }, { $lt: ['$wickets', 10] }] }, 1, 0] } },
                    tenWickets: { $sum: { $cond: [{ $eq: ['$wickets', 10] }, 1, 0] } }
                }
            }
        ]);

        for (const document of result) {
            const innings = document.innings;
            const gameType = document._id;
            if (innings > 0) {
                statsFinal[gameType] = {
                    innings,
                    runs: document.runs,
                    balls: document.balls,
                    maidens: document.maidens,
                    wickets: document.wickets,
                    fifers: document.fifers,
                    tenWickets: document.tenWickets
                };
            }
        }

        return statsFinal;
    }

    async getByMatchId (matchId) {
        await connectDatabase();

        return BowlingFigureModel.find({ matchId: matchId });
    }

    async remove (matchId) {
        await connectDatabase();

        await BowlingFigureModel.deleteMany({ matchId: matchId });
    }

    async merge (mergeRequest) {
        await connectDatabase();

        await BowlingFigureModel.updateMany({ 'playerId': mergeRequest.playerIdToMerge }, { "$set": { 'playerId': mergeRequest.originalPlayerId } });
    }
}

module.exports = BowlingFigureRepository;
