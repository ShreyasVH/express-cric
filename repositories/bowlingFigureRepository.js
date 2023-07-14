const connectDatabase = require('../config/database');
const { BowlingFigureModel, BowlingFigure } = require('../models/bowlingFigure');

class BowlingFigureRepository {
    async add (bowlingFigureRequests, playerTeamMap, match, gameTypeId, teamMap, teamTypeMap, session) {
        await connectDatabase();

        const addedEntries = [];
        for (const bowlingFigureRequest of bowlingFigureRequests) {
            const bowlingFigure = new BowlingFigure(bowlingFigureRequest, playerTeamMap, match, gameTypeId, teamMap, teamTypeMap);
            const bowlingFigureModel = new BowlingFigureModel(bowlingFigure);
            addedEntries.push(await bowlingFigureModel.save({ session }));
        }

        return addedEntries;
    }
}

module.exports = BowlingFigureRepository;
