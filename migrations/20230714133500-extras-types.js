module.exports = {
    async up(db, client) {
        await db.createCollection('extrasTypes');

        await db.collection('extrasTypes').insertMany([
            { _id: 1, name: 'Bye' },
            { _id: 2, name: 'Leg Bye' },
            { _id: 3, name: 'Wide' },
            { _id: 4, name: 'No Ball' },
            { _id: 5, name: 'Penalty' }
        ]);

        await db.collection('counters').insertOne({
            _id: 'extrasTypes',
            sequenceValue: 5
        });
    },

    async down(db, client) {
        await db.collection('extrasTypes').deleteMany({});

        await db.collection('counters').deleteOne({
            _id: 'extrasTypes'
        });

        await db.collection('extrasTypes').drop();
    }
};
