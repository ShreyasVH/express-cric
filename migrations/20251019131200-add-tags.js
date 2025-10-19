module.exports = {
    async up(db, client) {
        await db.createCollection('tags');

        await db.collection('tags').insertMany([
            { _id: 1, name: 'WORLD_CUP' },
            { _id: 2, name: 'IPL' },
            { _id: 3, name: 'CHAMPIONS_TROPHY' },
            { _id: 4, name: 'BBL' },
            { _id: 5, name: 'ILT20' },
            { _id: 6, name: 'CHAMPIONS_LEAGUE' },
            { _id: 7, name: 'ASIA_CUP' },
            { _id: 8, name: 'WTC' }
        ]);

        await db.collection('counters').insertOne({
            _id: 'tags',
            sequenceValue: 9
        });
    },

    async down(db, client) {
        await db.collection('tags').deleteMany({});

        await db.collection('counters').deleteOne({
            _id: 'tags'
        });

        await db.collection('tags').drop();
    }
};
