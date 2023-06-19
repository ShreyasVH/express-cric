module.exports = {
    async up(db, client) {
        await db.createCollection('manOfTheSeries');

        await db.collection('counters').insertOne({
            _id: 'manOfTheSeries',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'manOfTheSeries'
        });

        await db.collection('manOfTheSeries').drop();
    }
};

