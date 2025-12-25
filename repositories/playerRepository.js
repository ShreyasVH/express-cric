const { connectDatabase, getObjectId } = require('../config/database');
const { PlayerModel, Player } = require('../models/player');
const StatsResponse = require('../responses/statsResponse');
const { BattingScoreModel } = require('../models/battingScore');
const { BowlingFigureModel } = require('../models/bowlingFigure');

class PlayerRepository {
    async create (createRequest) {
        await connectDatabase();

        const player = new Player(createRequest)

        const playerModel = new PlayerModel(player);

        return await playerModel.save();
    }

    async findByNameAndCountryIdAndDateOfBirth (name, countryId, dateOfBirth) {
        await connectDatabase();
        return PlayerModel.findOne({ name, countryId, dateOfBirth });
    }

    async findAll(page, limit) {
        await connectDatabase();

        return PlayerModel.find().sort({ 'name': 1, '_id': 1 }).skip((page - 1) * limit).limit(limit);
    }

    async getTotalCount() {
        await connectDatabase();
        return PlayerModel.countDocuments();
    }

    async findByIds (ids) {
        await connectDatabase();
        return PlayerModel.find({ _id: { $in: ids } });
    }

    async findById (id) {
        await connectDatabase();
        return PlayerModel.findOne({ _id: id });
    }

    async remove (id) {
        await connectDatabase();
        await PlayerModel.deleteOne({ _id: id });
    }

    async search(keyword, page, limit) {
        await connectDatabase();

        return PlayerModel.find({
            name: { $regex: keyword, $options: "i" }
        }).sort({ 'name': 1, '_id': 1 }).skip((page - 1) * limit).limit(limit);
    }

    async searchCount(keyword) {
        await connectDatabase();

        return PlayerModel.countDocuments({
            name: { $regex: keyword, $options: "i" }
        });
    }

    getFieldNameWithTablePrefix = field => {
        let fieldName = '';

        switch (field) {
            case 'gameType': {
                fieldName = 'gameType.id';
                break;
            }
            case 'stadium': {
                fieldName = 'matchStadiumId';
                break;
            }
            case 'team': {
                fieldName = 'batsman.teamId';
                break;
            }
            case 'opposingTeam': {
                fieldName = 'opposingTeam.id';
                break;
            }
            case 'teamType': {
                fieldName = 'teamType._id';
                break;
            }
            case 'country': {
                fieldName = '';
                break;
            }
            case 'series': {
                fieldName = '';
                break;
            }
            case 'year': {
                fieldName = 'matchStartTime';
                break;
            }
        }

        return fieldName;
    }

    formatValue = (field, value, key) => {
        let formattedValue = value;

        switch (field) {
            case 'gameType':
            case 'teamType':
            {
                formattedValue = parseInt(value);
                break;
            }
            case 'opposingTeam':
            case 'stadium':
            {
                formattedValue = getObjectId(value);
                break;
            }
            case 'year': {
                formattedValue = new Date(`${((key === 'from') ? value : parseInt(value) + 1 )}-01-01`);
                break;
            }
        }

        return formattedValue;
    }

    formatValues = (field, valueList) => {
        return valueList.map(v => this.formatValue(field, v));
    }

    getValueForSortKey = sortKey => {
        let value = 1;

        switch (sortKey.toLowerCase()) {
            case 'asc': {
                value = 1;
                break;
            }
            case 'desc': {
                value = -1;
                break;
            }
        }

        return value;
    }

    getFieldNameForDisplay = field => {
        let fieldName = '';

        switch (field) {
            case 'runs': {
                fieldName = 'runs';
                break;
            }
            case 'balls': {
                fieldName = 'balls';
                break;
            }
            case 'innings': {
                fieldName = 'innings';
                break;
            }
            case 'notOuts': {
                fieldName = 'notOuts';
                break;
            }
            case 'fifties': {
                fieldName = 'fifties';
                break;
            }
            case 'hundreds': {
                fieldName = 'hundreds';
                break;
            }
            case 'highest': {
                fieldName = 'highest';
                break;
            }
            case 'fours': {
                fieldName = 'fours';
                break;
            }
            case 'sixes': {
                fieldName = 'sixes';
                break;
            }
            case 'wickets': {
                fieldName = 'wickets';
                break;
            }
            case 'maidens': {
                fieldName = 'maidens';
                break;
            }
            case 'fifers': {
                fieldName = 'fifers';
                break;
            }
            case 'tenWickets': {
                fieldName = 'tenWickets';
                break;
            }
            case 'fielderCatches': {
                fieldName = 'fielderCatches';
                break;
            }
            case 'keeperCatches': {
                fieldName = 'keeperCatches';
                break;
            }
            case 'stumpings': {
                fieldName = 'stumpings';
                break;
            }
            case 'runOuts': {
                fieldName = 'runOuts';
                break;
            }
        }

        return fieldName;
    }

    async getBattingStats(filterRequest) {
        await connectDatabase();

        const statsResponse = new StatsResponse();

        const countQuery = [];
        const query = [];



        const whereQueryParts = {};

        for (const [field, valueList] of Object.entries(filterRequest.filters)) {
            const fieldNameWithTablePrefix = this.getFieldNameWithTablePrefix(field);
            if (fieldNameWithTablePrefix.length && valueList.length > 0) {
                whereQueryParts[fieldNameWithTablePrefix] = {
                    $in: this.formatValues(field, valueList)
                }
            }
        }

        for (const [field, rangeValues] of Object.entries(filterRequest.rangeFilters)) {
            const fieldNameWithTablePrefix = this.getFieldNameWithTablePrefix(field);
            if (fieldNameWithTablePrefix.length && Object.keys(rangeValues).length > 0) {
                whereQueryParts[fieldNameWithTablePrefix] = {};

                if (rangeValues.hasOwnProperty('from')) {
                    whereQueryParts[fieldNameWithTablePrefix]['$gte'] = this.formatValue(field, rangeValues['from'], 'from');
                }

                if (rangeValues.hasOwnProperty('to')) {
                    whereQueryParts[fieldNameWithTablePrefix]['$lte'] = this.formatValue(field, rangeValues['to'], 'to');
                }
            }
        }


        if (Object.keys(whereQueryParts).length > 0) {
            countQuery.push({
                $match: whereQueryParts
            });

            query.push({
                $match: whereQueryParts
            });
        }

        countQuery.push({
            $group: {
                _id: "$batsman.playerId"
            }
        });

        query.push({
            $group: {
                _id: "$batsman.playerId",
                name: { $first: "$batsman.playerName" },
                innings: { $sum: 1 },
                runs: { $sum: '$runs' },
                balls: { $sum: '$balls' },
                notOuts: { $sum: { $cond: [ { $eq: [ { $type: "$dismissalMode" }, "missing"] }, 1, 0 ] }},
                fours: { $sum: '$fours' },
                sixes: { $sum: '$sixes' },
                highest: { $max: '$runs' },
                fifties: { $sum: { $cond: [{ $and: [{ $gte: ['$runs', 50] }, { $lt: ['$runs', 100] }] }, 1, 0] } },
                hundreds: { $sum: { $cond: [{ $gte: ['$runs', 100] }, 1, 0] } }
            }
        })

        countQuery.push({
            $count: 'count'
        });

        const sortMap = {};
        for (const [field, sortKey] of Object.entries(filterRequest.sortMap)) {
            const sortFieldName = this.getFieldNameForDisplay(field);
            if (sortFieldName) {
                sortMap[sortFieldName] = this.getValueForSortKey(sortKey);
            }
        }
        if (Object.keys(sortMap).length === 0) {
            sortMap[this.getFieldNameForDisplay('runs')] = this.getValueForSortKey('desc');
        }

        query.push({
            $sort: sortMap
        });

        query.push({
            $skip: filterRequest.offset
        });

        query.push({
           $limit: Math.min(30, filterRequest.count)
        });


        const countResult = await BattingScoreModel.aggregate(countQuery);
        statsResponse.count = countResult[0].count;

        const result = await BattingScoreModel.aggregate(query);
        statsResponse.stats = result.map(r => ({
            id: r._id,
            name: r.name,
            innings: r.innings.toString(),
            runs: r.runs.toString(),
            balls: r.balls.toString(),
            notOuts: r.notOuts.toString(),
            fours: r.fours.toString(),
            sixes: r.sixes.toString(),
            highest: r.highest.toString(),
            fifties: r.fifties.toString(),
            hundreds: r.hundreds.toString()
        }));

        return statsResponse;
    }

    async getBowlingStats(filterRequest) {
        await connectDatabase();

        const statsResponse = new StatsResponse();

        const countQuery = [];
        const query = [];

        const whereQueryParts = {};

        for (const [field, valueList] of Object.entries(filterRequest.filters)) {
            const fieldNameWithTablePrefix = this.getFieldNameWithTablePrefix(field);
            if (fieldNameWithTablePrefix.length && valueList.length > 0) {
                whereQueryParts[fieldNameWithTablePrefix] = {
                    $in: this.formatValues(field, valueList)
                }
            }
        }

        for (const [field, rangeValues] of Object.entries(filterRequest.rangeFilters)) {
            const fieldNameWithTablePrefix = this.getFieldNameWithTablePrefix(field);
            if (fieldNameWithTablePrefix.length && Object.keys(rangeValues).length > 0) {
                whereQueryParts[fieldNameWithTablePrefix] = {};

                if (rangeValues.hasOwnProperty('from')) {
                    whereQueryParts[fieldNameWithTablePrefix]['$gte'] = this.formatValue(field, rangeValues['from'], 'from');
                }

                if (rangeValues.hasOwnProperty('to')) {
                    whereQueryParts[fieldNameWithTablePrefix]['$lte'] = this.formatValue(field, rangeValues['to'], 'to');
                }
            }
        }


        if (Object.keys(whereQueryParts).length > 0) {
            countQuery.push({
                $match: whereQueryParts
            });

            query.push({
                $match: whereQueryParts
            });
        }

        countQuery.push({
            $group: {
                _id: "$playerId"
            }
        });

        query.push({
            $group: {
                _id: "$playerId",
                name: { $first: "$playerName" },
                innings: { $sum: 1 },
                wickets: { $sum: '$wickets' },
                runs: { $sum: '$runs' },
                balls: { $sum: '$balls' },
                maidens: { $sum: '$maidens' },
                fifers: { $sum: { $cond: [{ $and: [{ $gte: ['$wickets', 5] }, { $lt: ['$wickets', 10] }] }, 1, 0] } },
                tenWickets: { $sum: { $cond: [{ $gte: ['$wickets', 10] }, 1, 0] } }
            }
        })

        countQuery.push({
            $count: 'count'
        });

        const sortMap = {};
        for (const [field, sortKey] of Object.entries(filterRequest.sortMap)) {
            const sortFieldName = this.getFieldNameForDisplay(field);
            if (sortFieldName) {
                sortMap[sortFieldName] = this.getValueForSortKey(sortKey);
            }
        }
        if (Object.keys(sortMap).length === 0) {
            sortMap[this.getFieldNameForDisplay('runs')] = this.getValueForSortKey('desc');
        }

        query.push({
            $sort: sortMap
        });

        query.push({
            $skip: filterRequest.offset
        });

        query.push({
            $limit: Math.min(30, filterRequest.count)
        });

        const countResult = await BowlingFigureModel.aggregate(countQuery);
        statsResponse.count = countResult[0].count;

        const result = await BowlingFigureModel.aggregate(query);
        statsResponse.stats = result.map(r => ({
            id: r._id,
            name: r.name,
            innings: r.innings.toString(),
            wickets: r.wickets.toString(),
            runs: r.runs.toString(),
            balls: r.balls.toString(),
            maidens: r.maidens.toString(),
            fifers: r.fifers.toString(),
            tenWickets: r.tenWickets.toString()
        }));

        return statsResponse;
    }

    async getFieldingStats(filterRequest) {
        await connectDatabase();

        const statsResponse = new StatsResponse();

        const countQuery = [];
        const query = [];

        const whereQueryParts = {};

        for (const [field, valueList] of Object.entries(filterRequest.filters)) {
            const fieldNameWithTablePrefix = this.getFieldNameWithTablePrefix(field);
            if (fieldNameWithTablePrefix.length && valueList.length > 0) {
                whereQueryParts[fieldNameWithTablePrefix] = {
                    $in: this.formatValues(field, valueList)
                }
            }
        }

        for (const [field, rangeValues] of Object.entries(filterRequest.rangeFilters)) {
            const fieldNameWithTablePrefix = this.getFieldNameWithTablePrefix(field);
            if (fieldNameWithTablePrefix.length && Object.keys(rangeValues).length > 0) {
                whereQueryParts[fieldNameWithTablePrefix] = {};

                if (rangeValues.hasOwnProperty('from')) {
                    whereQueryParts[fieldNameWithTablePrefix]['$gte'] = this.formatValue(field, rangeValues['from'], 'from');
                }

                if (rangeValues.hasOwnProperty('to')) {
                    whereQueryParts[fieldNameWithTablePrefix]['$lte'] = this.formatValue(field, rangeValues['to'], 'to');
                }
            }
        }


        if (Object.keys(whereQueryParts).length > 0) {
            countQuery.push({
                $match: whereQueryParts
            });

            query.push({
                $match: whereQueryParts
            });
        }

        countQuery.push({
            $unwind: {
                path: "$fielders",
                preserveNullAndEmptyArrays: false
            }
        });

        query.push({
            $unwind: {
                path: "$fielders",
                preserveNullAndEmptyArrays: false
            }
        });

        countQuery.push({
            $match: {
                "fielders.playerName": {
                    $ne: "sub"
                }
            }
        });

        query.push({
            $match: {
                "fielders.playerName": {
                    $ne: "sub"
                }
            }
        });

        countQuery.push({
            $group: {
                _id: "$fielders.playerId"
            }
        });

        query.push({
            $group: {
                _id: "$fielders.playerId",
                name: { $first: "$fielders.playerName" },
                fielderCatches: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $eq: [
                                            "$dismissalMode.name",
                                            "Caught"
                                        ]
                                    },
                                    {
                                        $eq: [
                                            "$fielders.wicketKeeper",
                                            false
                                        ]
                                    }
                                ]
                            },
                            1,
                            0
                        ]
                    }
                },
                keeperCatches: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $eq: [
                                            "$dismissalMode.name",
                                            "Caught"
                                        ]
                                    },
                                    {
                                        $eq: [
                                            "$fielders.wicketKeeper",
                                            true
                                        ]
                                    }
                                ]
                            },
                            1,
                            0
                        ]
                    }
                },
                stumpings: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ["$dismissalMode.name", "Stumped"]
                            },
                            1,
                            0
                        ]
                    }
                },
                runOuts: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ["$dismissalMode.name", "Run Out"]
                            },
                            1,
                            0
                        ]
                    }
                }
            }
        })

        countQuery.push({
            $count: 'count'
        });

        const sortMap = {};
        for (const [field, sortKey] of Object.entries(filterRequest.sortMap)) {
            const sortFieldName = this.getFieldNameForDisplay(field);
            if (sortFieldName) {
                sortMap[sortFieldName] = this.getValueForSortKey(sortKey);
            }
        }
        if (Object.keys(sortMap).length === 0) {
            sortMap[this.getFieldNameForDisplay('fielderCatches')] = this.getValueForSortKey('desc');
        }

        query.push({
            $sort: sortMap
        });

        query.push({
            $skip: filterRequest.offset
        });

        query.push({
            $limit: Math.min(30, filterRequest.count)
        });


        const countResult = await BattingScoreModel.aggregate(countQuery);
        statsResponse.count = countResult[0].count;

        const result = await BattingScoreModel.aggregate(query);
        statsResponse.stats = result.map(r => ({
            id: r._id,
            name: r.name,
            fielderCatches: r.fielderCatches.toString(),
            keeperCatches: r.keeperCatches.toString(),
            stumpings: r.stumpings.toString(),
            runOuts: r.runOuts.toString()
        }));

        return statsResponse;
    }
}

module.exports = PlayerRepository;
