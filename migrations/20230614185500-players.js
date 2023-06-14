module.exports = {
    async up(db, client) {
        await db.createCollection('players');

        await db.collection('counters').insertOne({
            _id: 'players',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'players'
        });

        await db.collection('players').drop();
    }
};
