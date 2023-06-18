module.exports = {
    async up(db, client) {
        await db.createCollection('seriesTypes');

        await db.collection('seriesTypes').insertMany([
            { _id: 1, name: 'Bilateral' },
            { _id: 2, name: 'Tri series' },
            { _id: 3, name: 'Tournament' }
        ]);

        await db.collection('counters').insertOne({
            _id: 'seriesTypes',
            sequenceValue: 3
        });

        await db.createCollection('gameTypes');

        await db.collection('gameTypes').insertMany([
            { _id: 1, name: 'ODI' },
            { _id: 2, name: 'Test' },
            { _id: 3, name: 'T20' }
        ]);

        await db.collection('counters').insertOne({
            _id: 'gameTypes',
            sequenceValue: 3
        });

        await db.createCollection('series');

        await db.collection('counters').insertOne({
            _id: 'series',
            sequenceValue: 0
        });

        await db.createCollection('series_teams_map');

        await db.collection('counters').insertOne({
            _id: 'series_teams_map',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'series_teams_map'
        });

        await db.collection('series_teams_map').drop();

        await db.collection('counters').deleteOne({
            _id: 'teams'
        });

        await db.collection('teams').drop();

        await db.collection('counters').deleteOne({
            _id: 'seriesTypes'
        });

        await db.collection('seriesTypes').drop();

        await db.collection('counters').deleteOne({
            _id: 'gameTypes'
        });

        await db.collection('gameTypes').drop();
    }
};

