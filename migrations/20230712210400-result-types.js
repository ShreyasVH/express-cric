module.exports = {
    async up(db, client) {
        await db.createCollection('resultTypes');

        await db.collection('resultTypes').insertMany([
            { _id: 1, name: 'Normal' },
            { _id: 2, name: 'Tie' },
            { _id: 3, name: 'Draw' },
            { _id: 4, name: 'Super Over' },
            { _id: 5, name: 'Washed Out' },
            { _id: 6, name: 'Bowl Out' },
            { _id: 7, name: 'Draw' }
        ]);

        await db.collection('counters').insertOne({
            _id: 'resultTypes',
            sequenceValue: 8
        });
    },

    async down(db, client) {
        await db.collection('resultTypes').deleteMany({});

        await db.collection('counters').deleteOne({
            _id: 'resultTypes'
        });

        await db.collection('resultTypes').drop();
    }
};
