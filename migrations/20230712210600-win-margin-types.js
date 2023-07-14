module.exports = {
    async up(db, client) {
        await db.createCollection('winMarginTypes');

        await db.collection('winMarginTypes').insertMany([
            { _id: 1, name: 'Run' },
            { _id: 2, name: 'Wicket' }
        ]);

        await db.collection('counters').insertOne({
            _id: 'winMarginTypes',
            sequenceValue: 2
        });
    },

    async down(db, client) {
        await db.collection('winMarginTypes').deleteMany({});

        await db.collection('counters').deleteOne({
            _id: 'winMarginTypes'
        });

        await db.collection('winMarginTypes').drop();
    }
};
