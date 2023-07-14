module.exports = {
    async up(db, client) {
        await db.createCollection('manOfTheMatch');

        await db.collection('counters').insertOne({
            _id: 'manOfTheMatch',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'manOfTheMatch'
        });

        await db.collection('manOfTheMatch').drop();
    }
};
