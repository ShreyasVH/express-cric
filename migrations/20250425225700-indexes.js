module.exports = {
    async up(db, client) {
        db.collection('battingScores').createIndex({
            'batsman.playerId': 1,
            'isOfficialMatch': 1,
            'teamType.name': 1,
            'dismissalMode.name': 1
        })

        db.collection('battingScores').createIndex({
            'batsman.playerId': 1,
            'isOfficialMatch': 1,
            'teamType.name': 1
        })

        db.collection('battingScores').createIndex({
            "fielders.playerId": 1,
            "isOfficialMatch": 1,
            "teamType.name": 1
        })

        db.collection('bowlingFigures').createIndex({
            "playerId": 1,
            "isOfficialMatch": 1,
            "teamType.name": 1
        })
    },

    async down(db, client) {
        await db.collection('battingScores').dropIndex({
            "batsman.playerId": 1,
            "isOfficialMatch": 1,
            "teamType.name": 1,
            "dismissalMode.name": 1
        })

        await db.collection('battingScores').dropIndex({
            'batsman.playerId': 1,
            'isOfficialMatch': 1,
            'teamType.name': 1
        })

        await db.collection('battingScores').dropIndex({
            "fielders.playerId": 1,
            "isOfficialMatch": 1,
            "teamType.name": 1
        })

        await db.collection('bowlingFigures').dropIndex({
            "playerId": 1,
            "isOfficialMatch": 1,
            "teamType.name": 1
        })
    }
};
