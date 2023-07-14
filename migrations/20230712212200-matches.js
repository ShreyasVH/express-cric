module.exports = {
    async up(db, client) {
        await db.createCollection('matches');

        await db.collection('counters').insertOne({
            _id: 'matches',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'matches'
        });

        await db.collection('matches').drop();
    }
};

