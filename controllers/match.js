const CreateRequest = require('../requests/matches/createRequest');
const { asyncHandler, ok, created } = require('./base.js');
const TeamService = require('../services/teamService');
const SeriesService = require('../services/seriesService');
const CountryService = require('../services/countryService');
const ResultTypeService = require('../services/resultTypeService');
const WinMarginTypeService = require('../services/winMarginTypeService');
const StadiumService = require('../services/stadiumService');
const MatchService = require('../services/matchService');
const TeamTypeService = require('../services/teamTypeService');
const PlayerService = require('../services/playerService');
const MatchPlayerMapService = require('../services/matchPlayerService');
const BattingScoreService = require('../services/battingScoreService');
const DismissalModeService = require('../services/dismissalModeService');
const BowlingFigureService = require('../services/bowlingFigureService');
const ExtrasService = require('../services/extrasService');
const ExtrasTypeService = require('../services/extrasTypeService');
const ManOfTheMatchService = require('../services/manOfTheMatchService');
const CaptainService = require('../services/captainService');
const WicketKeeperService = require('../services/wicketKeeperService');
const GameTypeService = require('../services/gameTypeService');

const TeamResponse = require('../responses/teamResponse');
const CountryResponse = require('../responses/countryResponse');
const ResultTypeResponse = require('../responses/resultTypeResponse');
const TeamTypeResponse = require('../responses/teamTypeResponse');
const MatchResponse = require('../responses/matchResponse');
const WinMarginTypeResponse = require('../responses/winMarginTypeResponse');
const StadiumResponse = require('../responses/stadiumResponse');
const PlayerMiniResponse = require('../responses/playerMiniResponse');
const BattingScoreResponse = require('../responses/battingScoreResponse');
const BowlingFigureResponse = require('../responses/bowlingFigureResponse');
const ExtrasResponse = require('../responses/extrasResponse');
const ExtrasTypeResponse = require('../responses/extrasTypeResponse');
const GameTypeResponse = require('../responses/gameTypeResponse');

const NotFoundException = require('../exceptions/notFoundException');
const mongoose = require('mongoose');

const matchService = new MatchService();
const seriesService = new SeriesService();
const countryService = new CountryService();
const resultTypeService = new ResultTypeService();
const teamService = new TeamService();
const winMarginTypeService = new WinMarginTypeService();
const stadiumService = new StadiumService();
const teamTypeService = new TeamTypeService();
const playerService = new PlayerService();
const matchPlayerMapService = new MatchPlayerMapService();
const battingScoreService = new BattingScoreService();
const dismissalModeService = new DismissalModeService();
const bowlingFigureService = new BowlingFigureService();
const extrasTypeService = new ExtrasTypeService();
const extrasService = new ExtrasService();
const manOfTheMatchService = new ManOfTheMatchService();
const captainService = new CaptainService();
const wicketKeeperService = new WicketKeeperService();
const gameTypeService = new GameTypeService();

const create = asyncHandler(async (req, res, next) => {
    const createRequest = new CreateRequest(req.body);

    const series = await seriesService.getById(createRequest.seriesId);
    if (null === series) {
        throw new NotFoundException('Series');
    }
    let countryIds = [];
    const teamIds = [createRequest.team1Id, createRequest.team2Id];
    const teams = await teamService.getByIds(teamIds);
    const teamMap = {};
    for (const team of teams) {
        teamMap[team.id] = team;
        countryIds.push(team.countryId);
    }

    const team1 = teamMap[createRequest.team1Id];
    if (null === team1) {
        throw new NotFoundException('Team 1');
    }

    const team2 = teamMap[createRequest.team2Id];
    if (null === team2) {
        throw new NotFoundException('Team 2');
    }

    const resultType = await resultTypeService.findById(createRequest.resultTypeId);
    if(null === resultType)
    {
        throw new NotFoundException('Result type');
    }

    let winMarginTypeResponse = null;
    if (createRequest.winMarginTypeId) {
        const winMarginType = await winMarginTypeService.findById(createRequest.winMarginTypeId);
        if(null === winMarginType) {
            throw new NotFoundException('Win margin type');
        }

        winMarginTypeResponse = new WinMarginTypeResponse(winMarginType);
    }

    const stadium = await stadiumService.findById(createRequest.stadiumId);
    if(null === stadium)
    {
        throw new NotFoundException('Stadium');
    }

    const playerTeamMap = {};
    const allPlayerIds = [];
    for (const playerRequest of createRequest.players) {
        playerTeamMap[playerRequest.id] = playerRequest.teamId;
        allPlayerIds.push(playerRequest.id);
    }

    for (const playerRequest of createRequest.bench) {
        playerTeamMap[playerRequest.id] = playerRequest.teamId;
        allPlayerIds.push(playerRequest.id);
    }

    const allPlayers = await playerService.getByIds(allPlayerIds);
    const playerCountryIds = allPlayers.map(player => player.countryId);
    const playerMap = allPlayers.reduce((map, current) => {
        map[current.id] = current;
        return map;
    }, {});

    countryIds.push(team1.countryId);
    countryIds.push(team2.countryId);
    countryIds.push(stadium.countryId);
    countryIds = countryIds.concat(playerCountryIds);
    const teamTypeIds = [team1.typeId, team2.typeId];
    const teamTypes = await teamTypeService.findByIds(teamTypeIds);
    const teamTypeMap = teamTypes.reduce((map, current) => {
        map[current.id] = current;
        return map;
    }, {});

    const countries = await countryService.findByIds(countryIds);
    const countryMap = countries.reduce((map, current) => {
        map[current.id] = current;
        return map;
    }, {});

    const session = await mongoose.startSession();
    session.startTransaction();

    let match;
    let battingScoreResponses = [];
    let bowlingFigureResponses = [];
    let extrasResponses = [];
    try {
        match = await matchService.create(createRequest, session);
        const matchPlayerMapList = await matchPlayerMapService.add(match.id, allPlayerIds, playerTeamMap, session);
        const playerToMatchPlayerMap = matchPlayerMapList.reduce((map, current) => {
            map[current.playerId] = current.id;
            return map;
        }, {});
        const dismissalModes = await dismissalModeService.getAll();
        const dismissalModeMap = dismissalModes.reduce((map, current) => {
            map[current.id] = current;
            return map;
        }, {});

        const gameType = await gameTypeService.findById(series.gameTypeId);
        const gameTypeResponse = new GameTypeResponse(gameType);

        const battingScores = await battingScoreService.add(createRequest.battingScores, playerTeamMap, dismissalModeMap, match, gameTypeResponse, teamMap, teamTypeMap, session);
        battingScoreResponses = battingScores.map(battingScore => {
            let bowler = null;
            if (battingScore.bowler) {
                const player = playerMap[battingScore.bowler.playerId];
                bowler = new PlayerMiniResponse(player, new CountryResponse(countryMap[player.countryId]));
            }

            let fielders = [];
            if (battingScore.fielders) {
                fielders = battingScore.fielders.map(fielder => {
                    const player = playerMap[fielder.playerId];
                    return new PlayerMiniResponse(player, new CountryResponse(countryMap[player.countryId]));
                });
            }

            const batsmanPlayer = playerMap[battingScore.batsman.playerId];

            return new BattingScoreResponse(battingScore, new PlayerMiniResponse(batsmanPlayer, new CountryResponse(countryMap[batsmanPlayer.countryId])), battingScore.dismissalMode, bowler, fielders);
        });

        const bowlingFigures = await bowlingFigureService.add(createRequest.bowlingFigures, playerTeamMap, match, gameTypeResponse, teamMap, teamTypeMap, session);
        bowlingFigureResponses = bowlingFigures.map(bowlingFigure => {
            const bowlerPlayer = playerMap[bowlingFigure.playerId];

            return new BowlingFigureResponse(bowlingFigure, new PlayerMiniResponse(bowlerPlayer, new CountryResponse(countryMap[bowlerPlayer.countryId])));
        });

        const extrasTypes = await extrasTypeService.getAll();
        const extrasTypeMap = extrasTypes.reduce((map, current) => {
            map[current.id] = current;
            return map;
        }, {});

        const extrasList = await extrasService.add(match.id, createRequest.extras, session);
        extrasResponses = extrasList.map(extras => {
            const battingTeam = teamMap[extras.battingTeamId];
            const bowlingTeam = teamMap[extras.bowlingTeamId];

            return new ExtrasResponse(
                extras,
                new ExtrasTypeResponse(extrasTypeMap[extras.typeId]),
                new TeamResponse(
                    battingTeam,
                    new CountryResponse(countryMap[battingTeam.countryId]),
                    new TeamTypeResponse(teamTypeMap[battingTeam.typeId])
                ),
                new TeamResponse(
                    bowlingTeam,
                    new CountryResponse(countryMap[bowlingTeam.countryId]),
                    new TeamTypeResponse(teamTypeMap[bowlingTeam.typeId])
                )
            );
        });

        await manOfTheMatchService.add(match.id, createRequest.manOfTheMatchList, playerTeamMap, teamMap, teamTypeMap, gameTypeResponse, session);
        await captainService.add(match.id, createRequest.captains, playerTeamMap, teamMap, teamTypeMap, gameTypeResponse, session);
        await wicketKeeperService.add(match.id, createRequest.wicketKeepers, playerTeamMap, teamMap, teamTypeMap, gameTypeResponse, session)

        await session.commitTransaction();
        await session.endSession();
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        throw e;
    }

    const playerResponses = allPlayers.map(player => new PlayerMiniResponse(player, new CountryResponse(countryMap[player.countryId])));

    const matchResponse = new MatchResponse(
        match,
        series,
        new TeamResponse(team1, new CountryResponse(countryMap[team1.countryId]), new TeamTypeResponse(teamTypeMap[team1.typeId])),
        new TeamResponse(team2, new CountryResponse(countryMap[team2.countryId]), new TeamTypeResponse(teamTypeMap[team2.typeId])),
        new ResultTypeResponse(resultType),
        winMarginTypeResponse,
        new StadiumResponse(stadium, new CountryResponse(countryMap[stadium.countryId])),
        playerResponses,
        battingScoreResponses,
        bowlingFigureResponses,
        extrasResponses,
        createRequest.manOfTheMatchList,
        createRequest.captains,
        createRequest.wicketKeepers
    );

    created(res, matchResponse);
});

module.exports = {
    create
};
