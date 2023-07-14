module.exports = {
    async up(db, client) {
        await db.createCollection('bowlingFigures');

        await db.collection('counters').insertOne({
            _id: 'bowlingFigures',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'bowlingFigures'
        });

        await db.collection('bowlingFigures').drop();
    }
};
