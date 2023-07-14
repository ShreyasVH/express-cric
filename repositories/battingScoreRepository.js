const connectDatabase = require('../config/database');
const { BattingScoreModel, BattingScore } = require('../models/battingScore');

class BattingScoreRepository {
    async add (battingScoreRequests, playerTeamMap, dismissalModeMap, match, gameType, teamMap, teamTypeMap, session) {
        await connectDatabase();

        const addedEntries = [];
        for (const battingScoreRequest of battingScoreRequests) {
            const battingScore = new BattingScore(battingScoreRequest, playerTeamMap, dismissalModeMap, match, gameType, teamMap, teamTypeMap);
            const battingScoreModel = new BattingScoreModel(battingScore);
            addedEntries.push(await battingScoreModel.save({ session }));
        }

        return addedEntries;
    }

    async getDismissalStats (playerId) {
        await connectDatabase();

        const stats = {};

        const result = await BattingScoreModel.aggregate([
            { $match: { 'batsman.playerId': playerId } },
            {
                $group: {
                    _id: {
                        gameType: '$gameType.name',
                        dismissalMode: '$dismissalMode.name'
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    dismissalMode: '$_id.dismissalMode',
                    gameType: '$_id.gameType',
                    count: 1
                }
            }
        ]);

        for (const document of result) {
            const gameType = document.gameType;
            const dismissalMode = document.dismissalMode;

            if (gameType && dismissalMode) {
                const count = document.count;
                if (!stats.hasOwnProperty(gameType)) {
                    stats[gameType] = {};
                }
                stats[gameType][dismissalMode] = count;
            }
        }

        return stats;
    }

    async getBattingStats (playerId) {
        await connectDatabase();

        const statsFinal = {};

        const result = await BattingScoreModel.aggregate([
            { $match: { 'batsman.playerId': playerId } },
            {
                $group: {
                    _id: '$gameType.name',
                    innings: { $sum: 1 },
                    runs: { $sum: '$runs' },
                    balls: { $sum: '$balls' },
                    fours: { $sum: '$fours' },
                    sixes: { $sum: '$sixes' },
                    highest: { $max: '$runs' },
                    fifties: { $sum: { $cond: [{ $and: [{ $gte: ['$runs', 50] }, { $lt: ['$runs', 100] }] }, 1, 0] } },
                    hundreds: { $sum: { $cond: [{ $and: [{ $gte: ['$runs', 100] }, { $lt: ['$runs', 200] }] }, 1, 0] } },
                    twoHundreds: { $sum: { $cond: [{ $and: [{ $gte: ['$runs', 200] }, { $lt: ['$runs', 300] }] }, 1, 0] } },
                    threeHundreds: { $sum: { $cond: [{ $and: [{ $gte: ['$runs', 300] }, { $lt: ['$runs', 400] }] }, 1, 0] } },
                    fourHundreds: { $sum: { $cond: [{ $gte: ['$runs', 400] }, 1, 0] } }
                }
            }
        ]);

        for (const document of result) {
            const innings = document.innings;
            if (innings > 0) {
                const stats = {
                    innings,
                    runs: document.runs,
                    balls: document.balls,
                    fours: document.fours,
                    sixes: document.sixes,
                    highest: document.highest,
                    fifties: document.fifties,
                    hundreds: document.hundreds,
                    twoHundreds: document.twoHundreds,
                    threeHundreds: document.threeHundreds,
                    fourHundreds: document.fourHundreds
                };

                const gameType = document._id;
                statsFinal[gameType] = stats;
            }
        }

        return statsFinal;
    }

    async getFieldingStats (playerId) {
        await connectDatabase();

        const statsFinal = {};

        const result = await BattingScoreModel.aggregate([
            { $match: { 'fielders.playerId': playerId } },
            {
                $group: {
                    _id: {
                        gameType: '$gameType.name',
                        dismissalMode: '$dismissalMode.name'
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    dismissalMode: '$_id.dismissalMode',
                    gameType: '$_id.gameType',
                    count: 1
                }
            }
        ]);

        for (const document of result) {
            const gameType = document.gameType;
            const dismissalMode = document.dismissalMode;
            const count = document.count;
            if (!statsFinal.hasOwnProperty(gameType)) {
                statsFinal[gameType] = {};
            }
            statsFinal[gameType][dismissalMode] = count;
        }

        return statsFinal;
    }
}

module.exports = BattingScoreRepository;
