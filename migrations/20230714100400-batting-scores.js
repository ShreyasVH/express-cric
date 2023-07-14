module.exports = {
    async up(db, client) {
        await db.createCollection('battingScores');

        await db.collection('counters').insertOne({
            _id: 'battingScores',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'battingScores'
        });

        await db.collection('battingScores').drop();
    }
};
