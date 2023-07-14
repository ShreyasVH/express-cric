const CreateRequest = require('../requests/players/createRequest');
const { asyncHandler, ok, created } = require('./base.js');
const PlayerService = require('../services/playerService');
const CountryService = require('../services/countryService');
const BattingScoreService = require('../services/battingScoreService');
const BowlingFigureService = require('../services/bowlingFigureService');
const PlayerMiniResponse = require('../responses/playerMiniResponse');
const PlayerResponse = require('../responses/playerResponse');
const CountryResponse = require('../responses/countryResponse');
const BattingStats = require('../responses/battingStats');
const BowlingStats = require('../responses/bowlingStats');
const FieldingStats = require('../responses/fieldingStats');
const PaginatedResponse = require('../responses/paginatedResponse');
const NotFoundException = require('../exceptions/notFoundException');

const playerService = new PlayerService();
const countryService = new CountryService();
const battingScoreService = new BattingScoreService();
const bowlingFigureService = new BowlingFigureService();

const create = asyncHandler(async (req, res, next) => {
    const createRequest = new CreateRequest(req.body);

    const country = await countryService.findById(createRequest.countryId);
    if (null == country) {
        throw new NotFoundException('Country');
    }

    const player = await playerService.create(createRequest);
    created(res, new PlayerMiniResponse(player, new CountryResponse(country)));
});

const getAll = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const players = await playerService.getAll(page, limit);
    const countryIds = players.map(team => team.countryId);
    const countries = await countryService.findByIds(countryIds);
    const countryMap = countries.reduce((object, current) => {
        object[current._id] = current;
        return object;
    }, {});

    const playerResponses = players.map(player => new PlayerMiniResponse(player, new CountryResponse(countryMap[player.countryId])));
    let totalCount = 0;
    if (page === 1) {
        totalCount = await playerService.getTotalCount();
    }
    ok(res, new PaginatedResponse(totalCount, playerResponses, page, limit));
});

const getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const player = await playerService.getById(id);

    const playerResponse = new PlayerResponse(player);
    const country = await countryService.findById(player.countryId);
    playerResponse.country = new CountryResponse(country);

    const dismissalStats = await battingScoreService.getDismissalStats(id);
    playerResponse.dismissalStats = dismissalStats;

    const dismissalCountMap = {};
    for (const [gameType, gameTypeDismissalStats] of Object.entries(dismissalStats)) {
        let dismissalCount = 0;
        for (const [dismissalMode, count] of Object.entries(gameTypeDismissalStats)) {
            dismissalCount += count;
        }
        dismissalCountMap[gameType] = dismissalCount;
    }

    const basicBattingStats = await battingScoreService.getBattingStats(id);
    if (Object.keys(basicBattingStats).length > 0) {
        const battingStatsMap = {};

        for (const [gameType, gameTypeBattingStats] of Object.entries(basicBattingStats)) {
            const battingStats = new BattingStats(gameTypeBattingStats);
            battingStats.notOuts = battingStats.innings - (dismissalCountMap[gameType] ?? 0);

            if ((dismissalCountMap[gameType] ?? 0) > 0) {
                battingStats.average = battingStats.runs / dismissalCountMap[gameType];
            }

            if (battingStats.balls > 0) {
                battingStats.strikeRate = battingStats.runs * 100 / battingStats.balls;
            }

            battingStatsMap[gameType] = battingStats;
        }

        playerResponse.battingStats = battingStatsMap;
    }

    const basicBowlingStats = await bowlingFigureService.getBowlingStats(id);
    if (Object.keys(basicBowlingStats).length > 0) {
        const bowlingStatsFinal = {};

        for (const [gameType, gameTypeBowlingStats] of Object.entries(basicBowlingStats)) {
            const bowlingStats = new BowlingStats(gameTypeBowlingStats);

            if (bowlingStats.balls > 0) {
                bowlingStats.economy = bowlingStats.runs * 6 / bowlingStats.balls;

                if (bowlingStats.wickets > 0) {
                    bowlingStats.average = bowlingStats.runs / bowlingStats.wickets;
                    bowlingStats.strikeRate = bowlingStats.balls / bowlingStats.wickets;
                }
            }
            bowlingStatsFinal[gameType] = bowlingStats;
        }

        playerResponse.bowlingStats = bowlingStatsFinal;
    }

    const fieldingStatsMap = await battingScoreService.getFieldingStats(id);
    if (Object.keys(fieldingStatsMap).length > 0) {
        const fieldingStatsMapFinal = {};

        for (const [gameType, gameTypeFieldingStats] of Object.entries(fieldingStatsMap)) {
            fieldingStatsMapFinal[gameType] = new FieldingStats(gameTypeFieldingStats);
        }

        playerResponse.fieldingStats = fieldingStatsMapFinal;
    }

    return ok(res, playerResponse);
});

module.exports = {
    create,
    getAll,
    getById
};
